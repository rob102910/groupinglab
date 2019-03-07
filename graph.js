
var datawhatever = d3.json("data.json");

datawhatever.then(function(data)
{
  drawGraph(data,500,300,".one");
  drawGraph(data,600,400,".two");
  drawGraph(data,700,500,".three");
},
function(err)
{
  console.log(err)
})

var drawGraph = function(data,w,h,c)
{
  var screen = 
  {
    width:w,
    height:h
  };
  
var svg = d3.select(c)
             .attr("width",screen.width)
             .attr("height",screen.height)
             
var margins =
{ 
  top:50,
  bottom:50,
  left:100,
  right:100
}

var width = screen.width -margins.left -margins.right;
var height = screen.height- margins.top -margins.bottom;

//scales usually go here
var xScale = d3.scaleLinear()
                .domain([0,20])
                .range([0,width]);
var yScale = d3.scaleLinear()
                .domain([0,100])
                .range([0,height]);
  
var colors = d3.scaleOrdinal(d3.interpolateInferno);
               
//plot land
var plotLand = svg.append("g")
                  .classed("plot",true)
                  .attr("transform","translate("+margins.left+","+margins.top+ ")");
                  
var students = plotLand.selectAll("g")
                        .data(data)
                        .enter()
                        .append("g")
                        .attr("fill",function(d){return colors(d.name);})
                                                
                       
students.selectAll("circle")
        .data(function(d) {return d.grades})
        .enter()
        .append("circle")
        .attr("cx",function(d,i) {return xScale(i)})
        .attr("cy",function(d) {return yScale(d)})
        .attr("r",8);
                                                 
//the legend
var legend = svg.append("g")
                .classed("legend",true)
                .attr("transform","translate(" + (width+margins.left)+"," + margins.top+")" );
                                                 
var legendLines = legend.selectAll("g")
                        .data(data)
                        .enter()
                        .append("g")
                        .classed("legendLine",true)
                        .attr("transform",function(d,i) {return "translate(0," +(i*20)+")"; })
                                                 
legendLines.append("rect")
           .attr("x",0)
           .attr("y",0)
           .attr("width",10)
           .attr("height",10)
           .attr("fill",function(d) {return colors(d.name);})

legendLines.append("text")
           .attr("x",20)
           .attr("y",10)
           .text(function(d) {return d.name})
          
var xAxis = d3.axisBottom(xScale);
  
  svg.append("g").classed("xAxis",true)
     .call(xAxis)
     .attr("transform", "translate(" +margins.left+"," + (margins.top+height+10)+")")
  
 var yAxis = d3.axisLeft(yScale);
  
  svg.append("g").classed("yAxis",true)
     .call(yAxis)
     .attr("transform", "translate("+margins.left + "," + margins.top+")")
  
}
