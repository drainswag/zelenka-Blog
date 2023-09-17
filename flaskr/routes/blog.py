# -*- coding: utf-8 -*-
import json
from flask import Blueprint, jsonify, current_app, request
from functools import wraps
from datetime import datetime, timedelta

blog_bp = Blueprint('blog', __name__)

def with_database_manager(route_function):
    @wraps(route_function)
    def decorated_route(*args, **kwargs):
        with current_app.app_context():
            database_manager = current_app.database_manager
            return route_function(database_manager, *args, **kwargs)
    return decorated_route

def convert_timestamp_to_phrase(timestamp):
        current_time = datetime.now()
        created_time = datetime.fromtimestamp(timestamp)
        time_difference = current_time - created_time
        
        if time_difference < timedelta(hours=1):
            minutes_ago = int(time_difference.total_seconds() / 60)
            return f"{minutes_ago} минут назад"
        elif time_difference < timedelta(days=1):
            hours_ago = int(time_difference.total_seconds() / 3600)
            return f"{hours_ago} часов назад"
        else:
            days_ago = int(time_difference.total_seconds() / 86400)
            return f"{days_ago} суток назад"

@blog_bp.route('/api/articles', methods=['GET'])
@with_database_manager
def get_articles(database_manager):
    articles_as_dicts = database_manager.getArticlesDictionary()
    for article in articles_as_dicts:
        article['createdAt'] = convert_timestamp_to_phrase(article['createdAt'])
    
    return jsonify(articles_as_dicts), 200

@blog_bp.route('/api/articles/<int:article_id>', methods=['GET'])
@with_database_manager
def get_article_by_id(database_manager, article_id):
    article_info = database_manager.getArticleInfo(article_id)
    if article_info:
        article_info['createdAt'] = convert_timestamp_to_phrase(article_info['createdAt'])
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