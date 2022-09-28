
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
        // add linkType if IsFinal is set to true, else remove it, if present
        if(linkData.IsFinal && !linkData.hasOwnProperty('linkType')) {
          linkData['linkType'] = 'conscious.FinalThoughtLink, conscious';
        }
        else if((!linkData.hasOwnProperty('IsFinal') || !linkData['IsFinal']) && linkData.hasOwnProperty('linkType')) {
          delete linkData['linkType'];
        }

        let nextNodeData = svg.select('#n'+nextNodeId).data()[0];
        nextNodeData['Links'] = addLinksToThoughtData(svg, connections, nextNodeId);
        linkData['NextNode'] = nextNodeData;
        links.push(linkData);
      })
    }
    return links;
  }

  export function addItemIdToThoughtNodes(nestedThought, itemId) {
    nestedThought['ThingId'] = itemId;
    nestedThought.Links.forEach(elem => {
      elem['NextNode'] = addItemIdToThoughtNodes(elem['NextNode'], itemId);
    });
    return nestedThought;
  }

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
      treeStructure.push(currentNode);
    });

    return treeStructure;
  }