/**
 * @jest-environment jsdom
 */

import getSpawnPoint from '../../src/helpers/spawnpoints';

test('Returns array', () => {
  expect(Array.isArray(getSpawnPoint())).toBe(true);
});

test('Returns 2 lenght array', () => {
  expect(getSpawnPoint().length).toBe(2);
});

test('Return coordinates inside canvas', () => {
  expect(getSpawnPoint()[0] >= 0 && getSpawnPoint()[0] <= 640);
  expect(getSpawnPoint()[1] >= 0 && getSpawnPoint()[1] <= 480);
});