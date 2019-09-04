import os

from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime

from helper import apology, login_required

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///inventory.db")

@app.route("/")
# @login_required
def index():
    # """"Index""""

    return render_template("index.html")

### 
@app.route("/withdraw")
# @login_required
def withdraw():
    """withdraw stock"""
    id = request.args.get('id')
    qty = request.args.get('new_qty') 
    sql = "UPDATE items SET quantity = %s WHERE id = %s" %(qty, id)   
    row = db.execute(sql)
                    
    if row:
         return jsonify({'msg':'successful updated'})
    else:
         return jsonify({'msg':'cannot quantity to the items'})


@app.route("/delete_item", methods=["GET"])
# @login_required
def delete():
    """Delete stock from Inventory"""
    id = request.args.get('id')
    sql = "DELETE FROM items WHERE id=%s" %(id)
    row = db.execute(sql)
                    
    if row:
         return jsonify({'msg':'item deleted successfully'})
    else:
         return jsonify({'msg':'cannot delete items'})



@app.route("/add", methods=["GET"])
# @login_required
def add():
    """Add stock to Inventory"""
    id = request.args.get('id')
    qty = request.args.get('new_qty') 
    sql = "UPDATE items SET quantity = %s WHERE id = %s" %(qty, id)   
    row = db.execute(sql)
                    
    if row:
         return jsonify({'msg':'successful updated'})
    else:
         return jsonify({'msg':'cannot quantity to the items'})



@app.route("/inventory", methods=["GET", "POST"])
#@login_required
def inventory():
    """Notify the need for Re-stocking"""
    if request.method == "POST":
        itemName = request.form.get('name')
        quantity = request.form.get('quantity')
        thumbnail = request.form.get('thumbnail')
        user_id = session["user_id"]
        date  = str(datetime.now())
        sql = "INSERT INTO items (name, quantity, thumbnail, date, user_id) VALUES ('%s', %s, '%s', '%s', %s)" %(itemName, quantity, thumbnail, date, user_id)
        
        row = db.execute(sql)
        print(row)
        if row:
            # check if insert item is successfull
            #session["user_id"] = row
            return redirect("/inventory")
        else:
            return redirect("/")
    else:
        sql = "SELECT * FROM items"
        items = db.execute(sql)
        print(items)
        return render_template("inventory.html", items=items)

@app.route("/notify")
# @login_required
def notify():
    """Notify the need for Re-stocking"""


#     if request.method == "POST":

#         return render_template("buy.html")


@app.route("/history")
# @login_required
def history():
    """Show history of transactions"""
    if request.method == 'GET':
        print("hello")
        items = db.execute("SELECT users.username, history.id, history.item_name, history.activity, history.date FROM users INNER JOIN history ON users.id = history.user_id")
        print(items)
        return render_template("history.html", items=items)


# @app.route("/login", methods=["GET", "POST"])
# def login():
#     """Log user in"""
#     # Forget any user_id
#     session.clear()

#     # User reached route via POST (as by submitting a form via POST)
#     if request.method == "POST":

#         # Ensure username was submitted
#         return redirect("/")

#     # User reached route via GET (as by clicking a link or via redirect)
#     else:
#         return render_template("login.html")


# @app.route("/logout")
# def logout():
#     """Log user out"""

#     # Forget any user_id
#     session.clear()

#     # Redirect user to login form
#     return redirect("/")


# @app.route("/register", methods=["GET", "POST"])
# def register():
#     """Register user"""
#     return render_template("/login.html", msg="registration successful, login.")


# add users
@app.route("/users", methods=["GET", "POST"])
def users():
    """Add a User"""
    if request.method == "GET":
        userData = db.execute("SELECT id, username, role FROM users")
        print(userData)
        return render_template("users.html", userData=userData)
    elif request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirm = request.form.get("confirm")
        role = request.form.get("role")

        if password != confirm:
            return apology("Password Mismatch")
        if not username:
            return apology("You must input a username")
        if not role:
            return apology("You must choose a role")
        
        hash = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
        # print("hash=", hash)

        rows = db.execute("INSERT INTO users (username, hash, role) VALUES (:username, :hash, :role)", username=username, hash=hash, role=role)
        # print("rows=",rows)
        return redirect("/users")


@app.route("/remove_user", methods=["GET"])
def removeUser():
    """Remove User"""
    id = request.args.get("id")
    row = db.execute("DELETE FROM users where id=:id", id=id)

    if row:
        return jsonify({'msg':'User deleted successfully'})
    return jsonify({'msg':'Something went wrong'})



def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)