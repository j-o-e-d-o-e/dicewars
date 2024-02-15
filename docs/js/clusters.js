import{CLUSTERS_MAX}from"./info.js";import{Cluster}from"./cluster.js";const MIN_NEIGHBOURS_NODE=3;let paths,bigCount,smallCount;function createClusters(t){[paths,bigCount,smallCount]=[4,0,0];for(var e=[new Cluster(t)];e.length<=paths;){var o=getRandomAdjacentNodeFromCluster(e[0]);void 0!==o&&e.push(new Cluster(o))}for(;e.length<CLUSTERS_MAX&&0<=paths;){var n=getRandomAdjacentNodeFromCluster(e[getNextClusterIndex()]);void 0!==n&&(e.push(new Cluster(n)),(e.length-1)%paths==0)&&(bigCount+=paths)}return log(e),e}function getRandomAdjacentNodeFromCluster(t){t=t.adjacentNodesFromCluster().filter(t=>void 0===t.cluster&&t.adjacentNodesFromNode().filter(t=>void 0===t.cluster).length>=MIN_NEIGHBOURS_NODE);if(0!==t.length)return t[Math.floor(Math.random()*t.length)];paths--,++smallCount>=paths&&(smallCount=0)}function getNextClusterIndex(){var t=bigCount+smallCount+++1;return smallCount===paths&&(smallCount=0),t}function log(t){console.log(t.length+" clusters created with "+JSON.stringify(t.reduce((t,e)=>(t.nodes+=e.nodes.length,t.dices+=e.dices,t),{nodes:0,dices:0})))}export{createClusters};