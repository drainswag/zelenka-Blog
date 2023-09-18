from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
import csv

Base = declarative_base()
db = SQLAlchemy()

class Articles(Base):
    __tablename__ = 'articles'
    id = Column(Integer, primary_key=True)
    category = Column(String)
    title = Column(String)
    content = Column(String)
    createdAt = Column(Integer)
    preview_image_url = Column(String)

class Reviews(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    article_id = Column(Integer)
    author = Column(String)
    content = Column(String)
    createdAt = Column(Integer)

class Admins(Base):
    __tablename__ = 'admins'
    id = Column(Integer, primary_key=True)
    login = Column(String)
    password = Column(String)



class DatabaseManager:
    def __init__(self, connection_string):
        self.engine = create_engine(connection_string)
        self.Session = sessionmaker(bind=self.engine)
        Base.metadata.bind = self.engine
        Base.metadata.create_all(self.engine)

    def getArticlesDictionary(self):
        session = self.Session()
        articles = session.query(Articles).all()
        articles_as_dicts = [{"id": article.id,
                            "title": article.title,
                            "content": article.content,
                            "createdAt": article.createdAt,
                            "preview_image_url": article.preview_image_url}
                            for article in articles]
        session.close()
        return articles_as_dicts

    def getArticleInfo(self, article_id):
        session = self.Session()
        article = session.query(Articles).filter(Articles.id == article_id).first()
        if article:
            comments_count = session.query(func.count(Reviews.id)).filter(Reviews.id == article_id).scalar()
            article_info = {
                "id": article.id,
                "category": article.category,
                "title": article.title,
                "content": article.content,
                "createdAt": article.createdAt,
                "comments_count": comments_count,
                "preview_image_url": article.preview_image_url
            }
            session.close()
            return article_info
        return None
    
    def createArticle(self, article_data):
        session = self.Session()
        new_article = Articles(
            title=article_data['title'],
            category=article_data['category'], 
            createdAt=article_data['createdAt'],
            preview_image_url=article_data['preview_image_url'],
            content=article_data['content']
        )

        session.add(new_article)
        session.commit()
        session.close()

    def updateArticle(self, article):
        session = self.Session()
        session.add(article)
        session.commit()
        session.close()
    
    def getArticleById(self, article_id):
        session = self.Session()
        article = session.query(Articles).filter(Articles.id == article_id).first()
        session.close()
        return article
    
    def deleteArticleById(self, article_id):
        session = self.Session()
        article = session.query(Articles).filter(Articles.id == article_id).first()
        if article:
            session.delete(article)
            session.commit()
            session.close()
            return True  
        else:
            return False 
        
    def getCommentsForArticle(self, article_id):
        session = self.Session()
        comments = session.query(Reviews).filter(Reviews.article_id == article_id).all()
        comments_as_dicts = [{"id": comment.id,
                                "author": comment.author,
                                "content": comment.content,
                                "createdAt": comment.createdAt}
                                for comment in comments]
        session.close()
        return comments_as_dicts
    
    def createComment(self, comment_data):
        session = self.Session()
        new_comment = Reviews(**comment_data)
        session.add(new_comment)
        session.commit()
        session.close()

    def deleteComment(self, comment_id):
        session = self.Session()
        comment = session.query(Reviews).filter_by(id=comment_id).first()
        if comment:
            session.delete(comment)
            session.commit()
        session.close()

    def ArticlesPagination(self, offset, per_page):
        session = self.Session()
        articles = session.query(Articles).offset(offset).limit(per_page).all()
        articles_as_dicts = [
            {
                "id": article.id,
                "category": article.category,
                "title": article.title,
                "content": article.content,
                "createdAt": article.createdAt,
                "preview_image_url": article.preview_image_url
            }
            for article in articles
        ]

        return articles_as_dicts
    
    def get_user_by_credentials(self, login, password):
        session = self.Session()
        user = session.query(Admins).filter_by(login=login, password=password).first()
        session.close()
        return user
    
    def create_news(self):
        session = self.Session()
        if session.query(Articles).count() == 0:
            with open('news.csv', 'r', encoding='utf-8') as csvfile:
                csv_reader = csv.DictReader(csvfile)
                for row in csv_reader:
                    article = Articles(
                        category=row['category'],
                        title=row['title'],
                        content=row['content'],
                        createdAt=int(row['createdAt']),
                        preview_image_url=row['preview_image_url']
                    )
                    session.add(article)
        if session.query(Admins).count() == 0:
            admin = Admins(
                            login='admin',
                            password=123123,
                        )
            session.add(admin)
        session.commit()
        session.close()

    def get_total_articles_count(self):
            session = self.Session()
            total_count = session.query(Articles).count()
            return total_count