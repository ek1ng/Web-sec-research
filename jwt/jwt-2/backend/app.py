import sqlite3
from crypt import methods
from distutils.command.install_egg_info import to_filename
from flask import Flask, request, render_template, jsonify, redirect
import jwt

app = Flask(__name__)
jwt_secret = 'secret'

db = sqlite3.connect('database.db', check_same_thread=False)


def init_db():
    sqls = [
        'DROP TABLE IF EXISTS users',
        'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(64) NOT NULL, password VARCHAR(64) NOT NULL)',
        'INSERT INTO users (username,password) values (\'admin\',\'EcW8WTX8Nv4r4Fba\')'
    ]
    stmt = ';'.join(sqls)
    db.executescript(stmt)


@app.route("/")
def index():
    return render_template("login.html")


@app.route("/ping")
def ping():
    return "pong!"


@app.route("/register", methods=["POST", "GET"])
def register():
    m = request.method
    if m == 'GET':
        return render_template('register.html')
    elif m == "POST":
        body = request.get_json()
        username = body.get('username', '')
        password = body.get('password', '')

        try:
            db.execute(
                "INSERT INTO users (username,password) VALUES (?,?)", [username, password])
            return redirect("/", code=302)
        except:
            return render_template("card.html", title="Sign Up Error", text="Internal Server Error")


@app.route("/login", methods=['POST'])
def login():
    body = request.get_json()
    username = body.get('username', '')
    password = body.get('password', '')

    res = db.execute(
        "SELECT username,password FROM users WHERE username=?", [username])
    user_in_db, pwd_in_db = res.fetchone()

    if username == user_in_db and password == pwd_in_db:
        encoded = jwt.encode({'username': username},
                             jwt_secret, algorithm="HS256")
        res = jsonify({'msg': 'success'})
        res.set_cookie('token', encoded)
        return res
    else:
        res = jsonify({'msg': 'invalid username or password'})
        res.status_code = 401
        return res


@app.route("/whoami", methods=["GET"])
def whoami():
    token = request.cookies.get('token', '')
    if not token:
        return render_template('card.html', title='Unauthorized', text='Please login first')
    data = jwt.decode(token, jwt_secret, algorithms="HS256")
    return render_template('card.html', title='whoami', text=data['username'])


@app.route("/admin", methods=["GET"])
def admin():
    token = request.cookies.get('token', '')
    if not token:
        return render_template('card.html', title='Unauthorized', text='Please login first')
    data = jwt.decode(token, jwt_secret, algorithms="HS256")
    if data['useranme'] != 'admin':
        return render_template('card.html', title='Unauthorized', text='Only admin can view it')
    return render_template('admin.html')


if __name__ == '__main__':
    init_db()
    app.run('0.0.0.0', port=9090)
