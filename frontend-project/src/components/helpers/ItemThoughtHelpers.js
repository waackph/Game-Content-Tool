// ***
// A script with functions that help to manage the tree data structures for Thought Trees and Dialog Trees
// ***

// Given a SVG element with a Thought Graph and the stored connections
// the function builds the data structure to be stored from the graph.
export function addLinksToThoughtData(svg, connections, parentNodeId) {
  let links = [];

  // get connections
  let tmp = [];
  let connectionsToDelete = [];
  connections.forEach((elem, index) => {
    if(elem.parentNode === parentNodeId) {
      tmp.push(elem);
      connectionsToDelete.push(index);
    }
  })
  // remove connections retrieved
  connectionsToDelete.sort((a, b) => { return a-b; });
  for(var i = connectionsToDelete.length-1; i >= 0; i--){
    connections.splice(connectionsToDelete[i], 1);
  }

  // if links are present add link and childNode (where for childNode we again call the addLinks... function)
  if(tmp.length > 0) {
    tmp.forEach(connection => {
      const linkId = connection.link;
      const nextNodeId = connection.childNode;
      
      let linkData = svg.select('#e'+linkId).data()[0];
      if(linkData) {
        // add linkType if IsFinal is set to true, else remove it, if present
        if(linkData.IsFinal && !linkData.hasOwnProperty('linkType')) {
          linkData['linkType'] = 'conscious.DataHolderFinalThoughtLink, conscious';
        }
        else if((!linkData.hasOwnProperty('IsFinal') || !linkData['IsFinal']) && linkData.hasOwnProperty('linkType')) {
          linkData['linkType'] = 'conscious.DataHolderThoughtLink, conscious';
        }

        let nextNodeData = svg.select('#n'+nextNodeId).data()[0];
        nextNodeData['Links'] = addLinksToThoughtData(svg, connections, nextNodeId);
        linkData['NextNode'] = nextNodeData;
        links.push(linkData);
      }
    })
  }
  return links;
}

// A recursive function that simply adds the ThingId 
// as a field to each Node data structure of the Thought Tree. 
export function addItemIdToThoughtNodes(nestedThought, itemId) {
  nestedThought['ThingId'] = itemId;
  nestedThought.Links.forEach(elem => {
    elem['NextNode'] = addItemIdToThoughtNodes(elem['NextNode'], itemId);
  });
  return nestedThought;
}

// Given a SVG element with a Dialog Graph and the stored connections
// the function builds the data structure to be stored from the graph.
export function createDialogTreeStructure(svg, connections) {
  let treeStructure = [];

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  let parentNodes = connections.map(elem => elem.parentNode);
  parentNodes = parentNodes.filter(onlyUnique);
  
  parentNodes.forEach(nodeId => {
    let currentNode = svg.select('#n'+nodeId).data()[0];
    currentNode['_edges'] = []
    const nodeConnections = connections.filter(elem => elem.parentNode === nodeId);
    nodeConnections.forEach(conn => {
      if(conn.parentNode === nodeId) {
        let currentLink = svg.select('#e'+conn.link).data()[0];
        currentLink['_nextNodeId'] = conn.childNode;
        currentNode['_edges'].push(currentLink);
        // if childNode is final node, then add also
        if(!parentNodes.some(elem => elem === conn.childNode)) {
          let nextNode = svg.select('#n'+conn.childNode).data()[0];
          nextNode['_edges'] = [];
          treeStructure.push(nextNode);
        }
      }
    });
    // starting dialog node needs to have the id 1 (because of implementation purposes in the game)
    if(!connections.some(elem => elem.childNode === nodeId)) {
      currentNode.Id = 1;
    }
    treeStructure.push(currentNode);
  });
  return treeStructure;
}