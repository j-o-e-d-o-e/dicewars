import{CLUSTERS_MAX}from"./info.js";import{Cluster}from"./cluster.js";const MIN_NEIGHBOURS_NODE=3;let paths,bigCount,smallCount;function createClusters(e){[paths,bigCount,smallCount]=[4,0,0];let t=0;for(var r,o,n,s=[new Cluster(t++,e)];s.length<=paths;){var l=getRandomAdjacentNodeFromCluster(s[0]);void 0!==l&&s.push(new Cluster(t++,l))}for(;s.length<CLUSTERS_MAX&&0<=paths;){var a=getRandomAdjacentNodeFromCluster(s[getNextClusterIndex()]);void 0!==a&&(s.push(new Cluster(t++,a)),(s.length-1)%paths==0)&&(bigCount+=paths)}for(r of s)r.neighbours();s.sort((e,t)=>e.center.y-t.center.y);for([o,n]of s.entries()){n.id=o;for(var u of n.nodes)u.cluster=void 0;delete n.nodes}return transpose(s,e),log(s),s}function getRandomAdjacentNodeFromCluster(e){e=e.adjacentNodesFromCluster().filter(e=>void 0===e.cluster&&e.adjacentNodesFromNode().filter(e=>void 0===e.cluster).length>=MIN_NEIGHBOURS_NODE);if(0!==e.length)return e[Math.floor(Math.random()*e.length)];paths--,++smallCount>=paths&&(smallCount=0)}function getNextClusterIndex(){var e=bigCount+smallCount+++1;return smallCount===paths&&(smallCount=0),e}function transpose(e,t){let r,o;for(var n of e)(!r||n.center.x<r.x)&&(r=n.center),(!o||n.center.x>o.x)&&(o=n.center);var s,l=t.hex.center.x-r.x,t=o.x-t.hex.center.x,a=Math.floor(t<l?(l-t)/2:-(t-l)/2);for(s of e){s.center.x+=a;for(var u of s.corners)u.x+=a}}function log(e){console.log(`${e.length} clusters created with ${e.reduce((e,t)=>e+t.dices,0)} dices`)}export{createClusters};