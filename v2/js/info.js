export const CANVAS_WIDTH = 1280, CLUSTERS_MAX = 32, TIMEOUT_BG = 600, TIMEOUT_SM = 60;
export let CANVAS_HEIGHT = 745, RADIUS_HEX = 20;
export let PLAYERS = 7;

export function setPlayers(players) {
  PLAYERS = players;
}

export function setSizes(height) {
  if (height <= 750) {
    CANVAS_HEIGHT = height <= 550 ? 500 : 680;
    RADIUS_HEX = height <= 550 ? 13 : 18;
    document.getElementById("main-before").style.marginTop = CANVAS_HEIGHT + "px"
    document.getElementById("main-play").style.marginTop = CANVAS_HEIGHT + "px";
  }
}
