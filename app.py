from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def main():
  return render_template('index.html')

@app.route('/residential')
def res():
  return render_template('sfam.html')

@app.route('/commercial')
def com():
  return render_template('com.html')

@app.route('/industrial')
def ind():
  return render_template('ind.html')

@app.errorhandler(404)
def page_not_found(error):
    return 'Sorry, page not found', 404




if __name__ == '__main__':
  app.run(port=33507)
