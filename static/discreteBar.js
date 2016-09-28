nv.addGraph(function() {
  var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })    //Specify the data accessors.
      .y(function(d) { return d.value })
      ;

  d3.select('#chart svg')
      .datum(exampleData())
      .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});

//Each bar represents a single discrete quantity.
function exampleData() {
 return  [ 
    {
      key: "Cumulative Return",
      values: [
        { 
          "label" : "Minimum Yearly kWh" ,
          "value" : 10910
        } , 
        { 
          "label" : "Maximum Yearly kWh" , 
          "value" : 19760
        } , 
        { 
          "label" : "Average Yearly kWh" , 
          "value" : 12842
        } , 
        { 
          "label" : "LEED Standard Yearly kWh" , 
          "value" : 8500
        } 
      ]
    }
  ]

}