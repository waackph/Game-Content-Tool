import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
// Using this post as a guideline: https://ncoughlin.com/posts/d3-react/
// This post is better: https://blog.griddynamics.com/using-d3-js-with-react-js-an-8-step-comprehensive-manual/

const ThoughtGraph = ({ data }) => {
  const svgRef = useRef(null);

    // Chart dimensions
    let dimensions = {
      width: 1000,
      height: 500,
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
    svg.append("circle").attr("r", 15);
  }, [data, margin.left, margin.top]); // redraw chart if data changes (margins added because react is complaining otherwise...)

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default ThoughtGraph;