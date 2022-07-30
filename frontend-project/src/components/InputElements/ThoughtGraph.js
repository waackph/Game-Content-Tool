import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
// Using this post as a guideline: https://ncoughlin.com/posts/d3-react/
// This post is better: https://blog.griddynamics.com/using-d3-js-with-react-js-an-8-step-comprehensive-manual/

function createGraphFromNestedObject(canvas, links, id, xPos, yPos, connections, depth) {
  Array.prototype.forEach.call(links, link => {
    // Store connection
    connections.push({'parentNode': id, 'childNode': link.NextNode._id, 'link': link.Id, 'depth': depth});
    // Add next node
    const nodeData = {...link.NextNode};
    delete nodeData['Links'];
    canvas.append('circle').attr("r", 15).attr("cx", link.NextNode.x).attr('cy', link.NextNode.y).data([nodeData]).attr("id", function(d) { return "n" + d._id; });
    // Add line between current and next node
    const linkData = {...link};
    delete nodeData['NextNode'];
    canvas.append('line')
      .style("stroke", "black")
      .style("stroke-width", 2)
      .attr("x1", xPos)
      .attr("y1", yPos)
      .attr("x2", link.NextNode.x)
      .attr("y2", link.NextNode.y)
      .data([linkData]).attr("id", function(d) { return "e" + d.Id; });
    createGraphFromNestedObject(canvas, link.NextNode.Links, link.NextNode._id, link.NextNode.x, link.NextNode.y, connections, depth+1);
  });
}

const ThoughtGraph = ({ data, getConnections }) => {
  const svgRef = useRef(null);

  // Chart dimensions
  let dimensions = {
      width: 1000,
      height: 200,
      margin: {left: 50, right: 50, top: 50, bottom: 50},
    };

  const { width, height, margin } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;

  useEffect(() => {
    // D3 code

    let graphConnections = [];

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 

    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw elements
    // svg.append("circle").attr("r", 15);
    // Only Enter, because of recursion update and exit are not working as usual
    // let rootNode = svg.selectAll('g').data([data])
    //   .enter()
    //     .append('g');
    // Make a copy of data and remove links to have only data relevant for this node saved
    const nodeData = {...data};
    delete nodeData['Links'];
    svg.append('circle').attr("r", 15).attr("cx", data.x).attr('cy', data.y).data([nodeData]).attr("id", function(d) { return "n" + d._id; });
    createGraphFromNestedObject(svg, data.Links, data._id, data.x, data.y, graphConnections, 1);
    // Check if data is present
    // svg.selectAll('circle').each(function(d){console.log(d.Thought)});
    // svg.selectAll('line').each(function(d){console.log(d.Option)});
    // console.log(graphConnections);
    getConnections(graphConnections);
  }, [data, margin.left, margin.top, getConnections]); // redraw chart if data changes (margins added because react is complaining otherwise...)

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default ThoughtGraph;