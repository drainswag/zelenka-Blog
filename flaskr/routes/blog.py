from flask import Blueprint, jsonify, current_app, request
from functools import wraps

blog_bp = Blueprint('blog', __name__)

def with_database_manager(route_function):
    @wraps(route_function)
    def decorated_route(*args, **kwargs):
        with current_app.app_context():
            database_manager = current_app.database_manager
            return route_function(database_manager, *args, **kwargs)
    return decorated_route


@blog_bp.route('/api/articles', methods=['GET'])
@with_database_manager
def get_articles(database_manager):
    articles_as_dicts = database_manager.getArticlesDictionary()
    return jsonify(articles_as_dicts), 200

@blog_bp.route('/api/articles/<int:article_id>', methods=['GET'])
@with_database_manager
def get_article_by_id(database_manager,article_id):
    article_info = database_manager.getArticleInfo(article_id)
    if article_info:
        return jsonify(article_info)
    else:
        return jsonify({"error": "Article not found"}), 404
    
@blog_bp.route('/api/ArticlesPagination/<int:page>', methods=['GET'])
@with_database_manager
def pagination(database_manager,page):
    per_page = 10
    offset = (page - 1) * per_page
    articles_as_dicts = database_manager.ArticlesPagination(offset, per_page)
    return jsonify(articles_as_dicts)