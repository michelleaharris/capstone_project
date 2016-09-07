from flask import Flask, render_template, request, redirect, url_for

app_proj = Flask(__name__)

@app_proj.route('/')
def main():
  return redirect('/index')

@app_proj.route('/index')
def index():
	return render_template('index.html')


if __name__ == '__main__':
  app_proj.run(port=33507)
