from flask import Flask, render_template, request, redirect, url_for
import pickle

app = Flask(__name__)

app.vars={}

@app.route('/')
def main():
  return render_template('index.html')

@app.route('/energymap')
def com():
  return render_template('map.html')

@app.route('/comparison', methods=['GET','POST'])
def res():
  if request.method == 'GET':
    return render_template('calc.html')
  else:
    app.vars['age'] = float(request.form['age'])
    app.vars['stories'] = float(request.form['stories'])
    app.vars['occupied'] = float(request.form['occupied'])
    app.vars['sqft'] = int(request.form['sqft'])
    return redirect('/graph')
    
@app.route('/graph', methods=['GET'])
def graph():
  pipe = pickle.load(open('pipepick.pkl','rb'))
  pipe_min = pickle.load(open('pipepick_min.pkl','rb'))
  pipe_max = pickle.load(open('pipepick_max.pkl','rb'))
  app.vars['avg'] = int(pipe.predict([[app.vars['stories'],app.vars['age'],app.vars['occupied']]])*10)
  app.vars['min'] = int(pipe_min.predict([[app.vars['stories'],app.vars['age'],app.vars['occupied']]])*10)
  app.vars['max'] = int(pipe_max.predict([[app.vars['stories'],app.vars['age'],app.vars['occupied']]])*10)
  app.vars['money'] = int((app.vars['avg']-app.vars['min'])*0.06388)
  return render_template('graph.html', avg=app.vars['avg'], 
    money=app.vars['money'], min=app.vars['min'], max=app.vars['max'])    


@app.route('/explore')
def ind():
  return render_template('explore.html')



@app.errorhandler(404)
def page_not_found(error):
  return 'Sorry, page not found', 404




if __name__ == '__main__':
  app.debug = True
  app.run(port=33507)
