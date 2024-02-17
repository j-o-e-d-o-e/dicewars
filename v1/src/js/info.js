export const CANVAS_WIDTH = 1280, CANVAS_HEIGHT = 745, RADIUS_HEX = 20,
    CLUSTER_MIN_SIZE = 10, CLUSTERS_MAX = 32, TIMEOUT_BG = 600, TIMEOUT_SM = 60;
export let PLAYERS = 7;
export const COLORS = [
    {color: "#B37FFE", cubeId: 1}, {color: "#B3FF01", cubeId: 2},
    {color: "#009302", cubeId: 3}, {color: "#FF7FFE", cubeId: 4},
    {color: "#FF7F01", cubeId: 5}, {color: "#B3FFFE", cubeId: 6},
    {color: "#FFFF01", cubeId: 7}, {color: "#FF5858", cubeId: 8}
];
let colorIndex;

export function setPlayers(players) {
    PLAYERS = players;
}

export function setColor(humanId, colorI) {
    if (colorIndex) colorI = colorIndex;
    let tmp = COLORS[humanId];
    COLORS[humanId] = COLORS[colorI];
    COLORS[colorI] = tmp;
    colorIndex = humanId;
}
