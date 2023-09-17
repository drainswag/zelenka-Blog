from flask import Blueprint, jsonify, current_app, request
from functools import wraps

reviews_bp = Blueprint('reviews', __name__)

def with_database_manager(route_function):
    @wraps(route_function)
    def decorated_route(*args, **kwargs):
        with current_app.app_context():
            database_manager = current_app.database_manager
            return route_function(database_manager, *args, **kwargs)
    return decorated_route

    
@reviews_bp.route('/api/articles/<int:article_id>/comments', methods=['GET'])
@with_database_manager
def get_comments_for_article(database_manager,article_id):
    comments = database_manager.getCommentsForArticle(article_id)
    if comments:
        return jsonify(comments), 200
    else:
        return jsonify({"error": "No comments found for the article"}), 404
    
@reviews_bp.route('/api/articles/<int:article_id>/comments', methods=['POST'])
@with_database_manager
def create_comment_for_article(database_manager,article_id):
    data = request.json
    required_fields = ['author', 'content']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    new_comment = {
        'author': data['author'],
        'content': data['content'],
        'article_id': article_id 
    }
    database_manager.createComment(new_comment)
    return jsonify({"message": "Comment created successfully"}), 200

@reviews_bp.route('/api/comments/<int:comment_id>', methods=['DELETE'])
@with_database_manager
def delete_comment(database_manager,comment_id):
    database_manager.deleteComment(comment_id)
    return jsonify({"message": "Comment deleted successfully"}), 200