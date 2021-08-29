// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "chart");

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Create Graph

//Read the data
d3.csv("assets/data/data.csv").then(censusdata => {

    // Take your two variables from the csv
    censusdata.forEach(data => {
        data.poverty = +data.poverty;
        data.income =  +data.income;
        // State abbriviations
        data.abbr = +data.abbr;
    });

    // Initial axis params
    var xaxis = "income";
    var yaxis = "poverty";

    // X and Y axis scales
    var xLinearScale = d3.scaleLinear().range([0, width]).domain([d3.min(censusdata, d => d.income)*0.8, d3.max(censusdata, d => d.income)*1.2]);
    var yLinearScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(censusdata, d => d.poverty)]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
    .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(censusdata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[xaxis]))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r", 15)
    .attr("fill", "blue")
    .attr("opacity", ".5");

    // Create group for x-axis labels
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

    // append x axis
    var incomeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "income") // value to grab for event listener
    .classed("active", true)
    .text("Income");

    // append y axis
    var povertyLabel = chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Poverty");

    var stateabbr = chartGroup.append("g").selectAll(null)
    .data(censusdata)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d[xaxis]))
    .attr("y", d => yLinearScale(d[yaxis]))
    .text(d => d.abbr)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .classed("state-text", true);

});


// https://www.d3-graph-gallery.com/graph/scatter_basic.html
// , function(data) {

//   // Add X axis
//   var x = d3.scaleLinear()
//     .domain([0, 4000])
//     .range([ 0, width ]);
//   svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

//   // Add Y axis
//   var y = d3.scaleLinear()
//     .domain([0, 500000])
//     .range([ height, 0]);
//   svg.append("g")
//     .call(d3.axisLeft(y));

//   // Add dots
//   svg.append('g')
//     .selectAll("dot")
//     .data(data)
//     .enter()
//     .append("circle")
//       .attr("cx", function (d) { return x(d.GrLivArea); } )
//       .attr("cy", function (d) { return y(d.SalePrice); } )
//       .attr("r", 1.5)
//       .style("fill", "#69b3a2")

// })