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
    canvas.append('circle').attr("r", 15).attr("cx", link.NextNode.x).attr('cy', link.NextNode.y).style('fill', 'grey').data([nodeData]).attr("id", function(d) { return "n" + d._id; });
    // Add line between current and next node
    const linkData = {...link};
    delete nodeData['NextNode'];
    canvas.append('line')
      .style("stroke", "grey")
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

  let graphConnections = [];
  let inputMaskActive = -1;
  let inAddEdgeMode = false;
  let newLineId = -1;
  let startNode = -1;
  let destNode = -1;

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

  const dragstarted = (e, d) => {
    if(inAddEdgeMode) {
      console.log('drag start: create new line');

      const Id = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
      d3.select('#chartGroup').append('line')
        .style("stroke", "grey")
        .style("stroke-width", 5)
        .attr("x1", d.x) //d3.select(this).attr('cx'))
        .attr("y1", d.y)
        .attr("x2", d.x)
        .attr("y2", d.y)
        .data([{'Id': Id}]).attr("id", function(d) { return "e" + Id; });
      newLineId = Id;
      startNode = d._id;
    }
    else {
      d3.select(this).raise().classed("active", true);
    }
  }
  
  const dragended = d => {
    if(inAddEdgeMode) {
      console.log('drag end: remove new line');

      // TODO: only add edge if connection does not exist
      if(destNode !== startNode && destNode !== -1) {
        const tmpNode = d3.select('#n' + destNode);
        d3.select('#e' + newLineId).attr("x2", tmpNode.attr('cx')).attr("y2", tmpNode.attr('cy'));
        graphConnections.push({'parentNode': startNode, 'childNode': destNode, 'link': newLineId, 'depth': 1});
      }
      else {
        d3.select('#e' + newLineId).remove();
      }

      // Cleanup
      newLineId = -1;
      destNode = -1;
      startNode = -1;
      inAddEdgeMode = false;
    }
    else {
      d3.select(this).classed("active", false);
    }
  }

  function dragging(e, d) {
    console.log(inAddEdgeMode);
    if(inAddEdgeMode) {
      console.log('dragging: move new line');
      d3.select('#e' + newLineId).attr("x2", e.x).attr("y2", e.y);
    }
    else {
        // move circle
      d3.select(this).attr("cx", d.x = e.x).attr("cy", d.y = e.y);
      // move lines, circle is attached to
      graphConnections.forEach(elem => {
        if(d._id === elem.parentNode) {
          d3.select('#e'+elem.link)
          .attr("x1", d.x = e.x)
          .attr("y1", d.y = e.y);
        }
        else if(d._id === elem.childNode) {
          d3.select('#e'+elem.link)
          .attr("x2", d.x = e.x)
          .attr("y2", d.y = e.y);
        }
      })
    }
  }
  
  const onAddLink = e => {
    e.preventDefault();
    // TODO:
    // 1. add boolean to indicate AddLinkMode (or turning it of if clicked, and already in this mode)
    console.log(inAddEdgeMode);
    inAddEdgeMode = true;
    console.log(inAddEdgeMode);
    // 2. onclick: if on a node, select this node as starting point (start drawing line with node as starting point and mouse as end point)
    // 3. onmousedown: if on a node, select node as ending point, else remove line
    // 4. finish mode
  }

  const setDefaultStyle = () => {
    d3.selectAll('circle').style('fill', 'grey');
    d3.selectAll('line').style('stroke', 'grey');
  }

  // function onMouseDownNode(e, d) {
  //   console.log('mousedown on node');
  //   if(inAddEdgeMode) {
  //     const Id = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
  //     newLine = d3.select('#chartGroup').append('line')
  //       .style("stroke", "grey")
  //       .style("stroke-width", 5)
  //       .attr("x1", d3.select(this).attr('cx'))
  //       .attr("y1", d3.select(this).attr('cy'))
  //       .attr("x2", d3.select(this).attr('cx'))
  //       .attr("y2", d3.select(this).attr('cy'))
  //       .data([{'_id': Id}]).attr("id", function(d) { return "e" + d.Id; });
  //   }
  // }

  function onNodeEnter(e, d) {
    if(inAddEdgeMode) {
      destNode = d._id;
    }
  }

  function onNodeOut(e, d) {
    if(inAddEdgeMode) {
      destNode = -1;
    }
  }

  function onNodeClick(e, d) {
    console.log('mouseclick on node');
    if(!inAddEdgeMode) {
      if(inputMaskActive === d._id) {
        setNodeInputData({});
        inputMaskActive = -1;
        d3.select(this).style('fill', 'grey');
      }
      else {
        setLinkInputData({});
        setNodeInputData(d);
        inputMaskActive = d._id;
        setDefaultStyle();
        d3.select(this).style('fill', 'blue');
      }  
    }
  }

  function onLinkClick(e, d) {
    if(inputMaskActive === d.Id) {
      setLinkInputData({});
      inputMaskActive = -1;
      d3.select(this).style('stroke', 'grey');
    }
    else {
      setNodeInputData({});
      setLinkInputData(d);
      inputMaskActive = d.Id;
      setDefaultStyle();
      d3.select(this).style('stroke', 'blue');
    }
  }
  
  const onAddNode = e => {
    e.preventDefault();
    const Id = Math.floor(Math.random() * 10000 + Math.random() * 100 + 1);
    const circle = d3.select('#chartGroup').append('circle')
      .data([{'_id': Id}])
      .attr("r", 15)
      .attr("cx", svgWidth/2).attr('cy', svgHeight/2)
      .style('fill', 'grey')
      .attr("id", function(d) { return "n" + d._id; });
    circle.on('click', onNodeClick)
      .on('mouseenter', onNodeEnter)
      .on('mouseout', onNodeOut);
    circle.call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragging)
    .on("end", dragended));
  }

  useEffect(() => {
    // D3 code

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
    // svgEl.on('mousemove', e => {
    //   console.log('mousemove svg')
    //   if(inAddEdgeMode && newLine) {
    //     // let mouse = d3.mouse(this);
    //     newLine.attr("x2", e.pageX).attr("y2", e.pageY);
    // }
    // });
    // svgEl.on('click', e => {
    //   console.log('mouseclick svg')
    //   if(inAddEdgeMode) {
    //     inAddEdgeMode = false
    //   }
    // })

    const svg = svgEl
      .append("g")
      .attr('id', 'chartGroup')
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw elements

    // Make a copy of data and remove links to have only data relevant for this node saved
    const nodeData = {...data};
    delete nodeData['Links'];
    svg.append('circle')
      .data([nodeData])
      .attr("r", 15)
      .attr("cx", data.x).attr('cy', data.y)
      .style('fill', 'grey')
      .attr("id", function(d) { return "n" + d._id; });
    createGraphFromNestedObject(svg, data.Links, data._id, data.x, data.y, graphConnections, 1);

    // set up events for all graph elements
    svg.selectAll('circle')
      .on('click', onNodeClick)
      .on('mouseenter', onNodeEnter)
      .on('mouseout', onNodeOut);
      // .on('mousedown', onMouseDownNode);
    svg.selectAll('circle').call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragging)
      .on("end", dragended));

    svg.selectAll('line').lower();
    svg.selectAll('line')
      .on('click', onLinkClick);
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
      <button className="m-2" onClick={onAddNode}>Add Node</button>
      <button onClick={onAddLink}>Add Edge</button>
    </div>
    );
};

export default ThoughtGraph;