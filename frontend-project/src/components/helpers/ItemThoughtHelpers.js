

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