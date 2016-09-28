from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def main():
  return render_template('index.html')

@app.route('/comparison', methods=['GET','POST'])
def res():
  if request.method == 'GET':
    return render_template('sfam.html')
  else:
    app.vars['ticker'] = request.form['ticker'].upper()
    return redirect('/graph')

@app.route('/energymap')
def com():
  return render_template('com.html')

@app.route('/explore')
def ind():
  return render_template('ind.html')

@app.route('/residential')
def viol():
  return render_template('violin.html')

@app.route('/graph', methods=['GET'])
def graph():
	#Data into Pandas
	qurl = 'https://www.quandl.com/api/v3/datasets/WIKI/%s.json?column_index=4&start_date=2016-08-01&api_key=PbjyCkG1dayVcyLQx-si' % app.vars['ticker']
	r = requests.get(qurl)
	col = r.json()['dataset']['column_names']
	data = r.json()['dataset']['data']
	df = pd.DataFrame(data, columns=col)

	#Bokeh plot
	p = figure(x_axis_type="datetime", title="August 2016 Closing")
	p.grid.grid_line_alpha=0.3
	p.xaxis.axis_label = 'Date'
	p.yaxis.axis_label = 'Closing Price'
	p.line(datetime(df['Date']), df['Close'], color='#33A02C')

	script, div = components(p)

	return render_template('graph.html',ticker=app.vars['ticker'], script=script, div=div)

@app.errorhandler(404)
def page_not_found(error):
    return 'Sorry, page not found', 404




if __name__ == '__main__':
  app.run(port=33507)
