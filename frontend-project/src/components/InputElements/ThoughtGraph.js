import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
// Using this post as a guideline: https://ncoughlin.com/posts/d3-react/
// This post is better: https://blog.griddynamics.com/using-d3-js-with-react-js-an-8-step-comprehensive-manual/

function createGraphFromNestedObject(canvas, links, xPos, yPos) {
  // recursive d3 function: https://stackoverflow.com/questions/14380520/how-do-i-write-recursive-d3-js-code-to-deal-with-nested-data-structures
  // parentNode.text(function(d){return d.Thought});
  const xSpace = 40;
  const ySpace = 40;
  let xPosNext = xPos + xSpace;
  let i = Math.floor(links.length/2);
  Array.prototype.forEach.call(links, link => {
    // Add next node
    let yPosNext = yPos + ySpace*i;
    canvas.append('circle').attr("r", 15).attr("cx", xPosNext).attr('cy', yPosNext).data([link.NextNode]);
    // Add line between current and next node
    canvas.append('line')
      .style("stroke", "black")
      .style("stroke-width", 2)
      .attr("x1", xPos)
      .attr("y1", yPos)
      .attr("x2", xPosNext)
      .attr("y2", yPosNext); 
    i = i-1;
    createGraphFromNestedObject(canvas, link.NextNode.Links, xPosNext, yPosNext);
  });
}

const ThoughtGraph = ({ data }) => {
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
    let nX = 40;
    let nY = 100;
    svg.append('circle').attr("r", 15).attr("cx", nX).attr('cy', nY).data([data]);
    createGraphFromNestedObject(svg, data.Links, nX, nY);
  }, [data, margin.left, margin.top]); // redraw chart if data changes (margins added because react is complaining otherwise...)

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default ThoughtGraph;