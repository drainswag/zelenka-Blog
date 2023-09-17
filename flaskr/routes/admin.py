from flask import Blueprint, jsonify, current_app, request
from functools import wraps
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required
import jwt

admin_bp = Blueprint('admin', __name__)
SECRET_KEY = 'youngdrainy123'


def with_database_manager(route_function):
    @wraps(route_function)
    def decorated_route(*args, **kwargs):
        with current_app.app_context():
            database_manager = current_app.database_manager
            return route_function(database_manager, *args, **kwargs)
    return decorated_route

def create_access_token(data, expires_delta=None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=1) 
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt
    
@admin_bp.route('/api/articles', methods=['POST'])
@with_database_manager
@jwt_required()
def create_article(database_manager):
    data = request.json
    required_fields = ['title', 'date', 'preview_image_url', 'content', 'category']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    new_article = {
        'title': data['title'],
        'category': data['category'],  
        'createdAt': data['date'],
        'preview_image_url': data['preview_image_url'],
        'content': data['content']
    }
    database_manager.createArticle(new_article)

    return jsonify({"message": "Article created successfully"}), 200

@admin_bp.route('/api/articles/<int:article_id>', methods=['PUT'])
@with_database_manager
@jwt_required()
def update_article(database_manager,article_id):
    data = request.json
    required_fields = ['title', 'content']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    article = database_manager.getArticleById(article_id)
    if article is None:
        return jsonify({"error": "Article not found"}), 404
    article.title = data['title']
    article.content = data['content']
    database_manager.updateArticle(article)
    return jsonify({"message": "Article updated successfully"}), 200

@admin_bp.route('/api/articles/<int:article_id>', methods=['DELETE'])
@with_database_manager
@jwt_required()
def delete_article(database_manager,article_id):
    deleted = database_manager.deleteArticleById(article_id)
    if deleted:
        return jsonify({"message": "Article deleted successfully"}), 200
    else:
        return jsonify({"error": "Article not found"}), 404
    

@admin_bp.route('/api/auth', methods=['POST'])
@with_database_manager
def authenticate(database_manager):
    login = request.json.get('login')
    password = request.json.get('password')
    user = database_manager.get_user_by_credentials(login, password)
    if user:
        access_token = create_access_token(identity=login)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401