import {createBoard} from "../js/board.js";
import {createTestClusters} from "./bootstrap.js";
// noinspection ES6UnusedImports: avoid 'ReferenceError: Cannot access 'Player' before initialization'
import {Human} from "../js/player-human.js";
import {Comp} from "../js/player-comp.js";

let clusters;

beforeAll(() => {
  let board = createBoard()[0];
  clusters = createTestClusters(board, 7);
});

test('target with 2 dices less is preferred to target with 1 dice less', () => {
  let comp = new Comp(1);
  let cluster = clusters[10];

  let target = comp.target(cluster, []);

  expect(target.playerId).not.toBe(comp.id);
  expect(target.dices).toBeLessThanOrEqual(cluster.dices - 2);
  expect(target.id).toBe(9);
});

test('target with more dices is preferred', () => {
  let comp = new Comp(2);
  let cluster = clusters[13];

  let target = comp.target(cluster, []);

  expect(target.playerId).not.toBe(comp.id);
  expect(target.dices).toBeLessThanOrEqual(cluster.dices - 2);
  expect(target.id).toBe(15);
});

test('if no alternative with lesser dices, target with one dice less is chosen', () => {
  let comp = new Comp(0);
  let cluster = clusters[5];

  let target = comp.target(cluster, []);

  expect(target.playerId).not.toBe(comp.id);
  expect(target.dices).toBeLessThanOrEqual(cluster.dices - 1);
  expect(target.id).toBe(6);
});

test('if attack with 8 dices, chosen target may have also eight dices', () => {
  let comp = new Comp(0);
  let cluster = clusters[0];

  let target = comp.target(cluster, []);

  expect(target.playerId).not.toBe(comp.id);
  expect(target.dices).toBeLessThanOrEqual(cluster.dices);
  expect(target.id).toBe(2);
});

test('if dices less than all dices of possible targets, no target chosen', () => {
  let comp = new Comp(2);
  let cluster = clusters[11];

  let target = comp.target(cluster, []);

  expect(target).toBe(undefined);
});

test('if a neighbour of target has more dices than cluster, do not attack target', () => {
  let comp = new Comp(0);
  let cluster = clusters[16];

  let target = comp.target(cluster, []);

  expect(target).toBe(undefined);
});

test('if all neighbours of target have not more dices than cluster, do attack target', () => {
  let comp = new Comp(0);
  let cluster = clusters[17];

  let target = comp.target(cluster, []);

  expect(target.playerId).not.toBe(comp.id);
  expect(target.dices).toBeLessThanOrEqual(cluster.dices);
  expect(target.id).toBe(14);
});

test('if cautious and a neighbour of target has more or same dices than cluster, do not attack target', () => {
  let comp = new Comp(0, true);
  let cluster = clusters[18];

  let target = comp.target(cluster, []);

  expect(target).toBe(undefined);
});

test('if not cautious and a neighbour of target has more or same dices than cluster, do attack target', () => {
  let comp = new Comp(0, false);
  let cluster = clusters[18];

  let target = comp.target(cluster, []);

  expect(target.playerId).not.toBe(comp.id);
  expect(target.dices).toBeLessThanOrEqual(cluster.dices);
  expect(target.id).toBe(12);
});
