from flask import Flask
from db.db import DatabaseManager
from flask_jwt_extended import JWTManager
from routes.blog import blog_bp
from routes.admin import admin_bp
from routes.reviews import reviews_bp
from flask_cors import CORS


app = Flask(__name__)

database_manager = DatabaseManager('postgresql://postgres:123123@localhost/postgres') #Не забыть закинуть в env
app.database_manager = database_manager
app.config['JSON_AS_ASCII'] = False

jwt = JWTManager(app)
CORS(app)


database_manager.create_news()

app.register_blueprint(blog_bp, database_manager=database_manager)
app.register_blueprint(reviews_bp, database_manager=database_manager)
app.register_blueprint(admin_bp, database_manager=database_manager)

if __name__ == '__main__':
    app.run(debug=True,port=8080)
