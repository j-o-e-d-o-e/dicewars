export const CANVAS_WIDTH = 1280, CLUSTERS_MAX = 32, TIMEOUT_BG = 600, TIMEOUT_SM = 60;
export let PLAYERS = 7;

export function setPlayers(players) {
  PLAYERS = players;
}

export let CANVAS_HEIGHT = 745, RADIUS_HEX = 20;

export function setSize(height) {
  if (height < 750) {
    CANVAS_HEIGHT = 680; // 720
    RADIUS_HEX = 18;
  }
}
