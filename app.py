from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def main():
  return render_template('index.html')

@app.route('/comparison')
def res():
  return render_template('sfam.html')

@app.route('/explore')
def com():
  return render_template('com.html')

@app.errorhandler(404)
def page_not_found(error):
    return 'Sorry, page not found', 404




if __name__ == '__main__':
  app.run(port=33507)
