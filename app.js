function buildMetadata(sample) {
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO: 
    // make sure to filter out the id
    d3.json("samples.json").then((data) =>  {
      var filteredData = data.metadata.filter(meta => meta.id.toString() === sample)[0];
      console.log(filteredData)
      var meta = d3.select("#sample-metadata")
      Object.entries(filteredData).forEach(function ([key, value]) {
        var row = meta.append("p");
        row.text(`${key}: ${value}`);
  
  });
    })
};

function buildCharts(data) {
    // Make an API call to gather all data and then reduce to matching the sample selected
    //TODO:
    d3.json("samples.json").then((data) =>  {
  
      // @TODO: Build a Bubble Chart using the sample data
      var x = data.otu_ids;
      var y = data.sample_values;
      var m_size = data.sample_values;
      var m_colors = data.otu_ids; 
      var text = data.otu_labels;
  
      var trace1 = {
        x: x,
        y: y,
        text: text,
        mode: 'markers',
        marker: {
          color: m_colors,
          size: m_size
        } 
      };
    
      var data = [trace1];
  
      var layout = {
        xaxis: { title: "OTU ID"},
      };
  
      Plotly.newPlot('bubble', data, layout);
     
  
      // @TODO: Build a Bar Chart
      d3.json("samples.json").then(function(data) {  
      var ylabels = data.sample_values
        var xlabels = data.otu_ids
    
  
        var data = [{
          values: ylabels,
          labels: xlabels,
          type: 'bar'
        }];
  
        Plotly.newPlot('bar', data);
  
      });
    });   
  }
    
    


function init() {
    
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);

      // Loop through sampleNames to add "option" elements to the selector
      //TODO: 
      d3.json("samples.json").then((sampleNames) => {
        sampleNames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });


    });
  })
}  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();