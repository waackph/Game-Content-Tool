import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import NodeInput from "./NodeInput";
import LinkInput from "./LinkInput";
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
      .style("stroke-width", 5)
      .attr("x1", xPos)
      .attr("y1", yPos)
      .attr("x2", link.NextNode.x)
      .attr("y2", link.NextNode.y)
      .data([linkData]).attr("id", function(d) { return "e" + d.Id; });
    createGraphFromNestedObject(canvas, link.NextNode.Links, link.NextNode._id, link.NextNode.x, link.NextNode.y, connections, depth+1);
  });
}

const ThoughtGraph = ({ data, getConnections }) => {
  const [nodeInputData, setNodeInputData] = useState({});
  const [linkInputData, setLinkInputData] = useState({});

  const onChangeInputNodeData = e => {
    e.preventDefault();
    let { name, value } = e.target;
    // In case of checkbox value, assign correct boolean
    if(value === 'on') {
      name = name.substring(4);
      value = !nodeInputData[name];
    }
    setNodeInputData({
      ...nodeInputData,
      [name]: value,
    })  
  }

  const onChangeInputLinkData = e => {
    e.preventDefault();
    let { name, value } = e.target;
    // In case of checkbox value, assign correct boolean
    if(value === 'on') {
      name = name.substring(4);
      value = !linkInputData[name];
    }
    setLinkInputData({
      ...linkInputData,
      [name]: value,
    })  
  }

  const assignDataToNode = e => {
    e.preventDefault();
    d3.select('svg').select('#n'+nodeInputData._id).data([nodeInputData]);
  }

  const assignDataToLink = e => {
    e.preventDefault();
    d3.select('svg').select('#n'+linkInputData._id).data([linkInputData]);
  }

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
    let inputMaskActive = -1;

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 

    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw elements

    // Make a copy of data and remove links to have only data relevant for this node saved
    const nodeData = {...data};
    delete nodeData['Links'];
    svg.append('circle')
      .data([nodeData])
      .attr("r", 15)
      .attr("cx", data.x).attr('cy', data.y)
      .attr("id", function(d) { return "n" + d._id; });
    createGraphFromNestedObject(svg, data.Links, data._id, data.x, data.y, graphConnections, 1);

    // set up events for all graph elements
    svg.selectAll('circle')
      .on('click', function(e, d) {
        if(inputMaskActive === d._id) {
          setNodeInputData({});
          inputMaskActive = -1;
          d3.select(this).style('fill', 'black');
        }
        else {
          setLinkInputData({});
          setNodeInputData(d);
          inputMaskActive = d._id;
          d3.select(this).style('fill', 'blue');
        }
      });
    svg.selectAll('line').lower();
    svg.selectAll('line')
      .on('click', function(e, d) {
        if(inputMaskActive === d.Id) {
          setLinkInputData({});
          inputMaskActive = -1;
          d3.select(this).style('stroke', 'black');
        }
        else {
          setNodeInputData({});
          setLinkInputData(d);
          inputMaskActive = d.Id;
          d3.select(this).style('stroke', 'blue');
        }
      });
    // Check if data is present
    // svg.selectAll('circle').each(function(d){console.log(d.Thought)});
    // svg.selectAll('line').each(function(d){console.log(d.Option)});
    // console.log(graphConnections);
    getConnections(graphConnections);
  }, [data, margin.left, margin.top, getConnections]); // redraw chart if data changes (margins added because react is complaining otherwise...)

  return ( 
    <div>
      <svg ref={svgRef} width={svgWidth} height={svgHeight} />
      <NodeInput data={nodeInputData} onChange={onChangeInputNodeData} assignDataToNode={assignDataToNode} />
      <LinkInput data={linkInputData} onChange={onChangeInputLinkData} assignDataToNode={assignDataToLink} />
    </div>
    );
};

export default ThoughtGraph;