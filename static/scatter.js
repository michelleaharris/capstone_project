/* load data */
d3.csv("{{ url_for('static', filename='data/Data.csv')}}", function(error, csv_data){
    console.log(csv_data)
        var nested_data = d3.nest()
            .key(function(d) { return d.group;; })
            .entries(csv_data);
    
nv.addGraph(function() {
    var chart = nv.models.scatterChart()
                .showDistX(true) 
                .showDistY(true)
        .forceX([0, 600])
        .forceY([0,50000])
        .useVoronoi(true)
        .duration(5500).width(700).height(500)
            .color(d3.scale.category10().range());
    //Axis settings
    chart.yAxis.axisLabel('GNI per capita ($)').axisLabelDistance(10);
    chart.xAxis.axisLabel('Depth of Food Deficit(Kilo Calories per person per day)').axisLabelDistance(1);
    chart.xAxis.tickFormat(d3.format('2f'));
    chart.yAxis.tickFormat(d3.format('2,0f'));
    //circle size
    chart.pointRange([190,191]);
    // TOOLTIP
    chart.tooltip.contentGenerator(function(graph) {
        /* console.log(graph); //examine the graph object in the console for more info */
        return graph.point.country;
    });
    /* B: */
    /* http://stackoverflow.com/questions/21532228/how-to-create-a-tooltip-with-custom-value */
    /* chart.tooltip.contentGenerator(function (d) {
       var ptIdx = d.pointIndex;
       var serIdx = d.seriesIndex;
       z = d.series[serIdx].values[ptIdx].country
       return z;
       }); */
    chart.tooltip.duration(5100);
    chart.tooltip.hideDelay(100);
        
    d3.select('#thisplot svg')
        .datum(nested_data)
        .transition().duration(200)
        /* .attr("style", "outline: thin solid black;")  */
        .call(chart);
    nv.utils.windowResize(chart.update);
    return chart;
});
});
