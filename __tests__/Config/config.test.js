/**
 * @jest-environment jsdom
 */

import config from '../../src/Config/config';

test('config object', () => {
  expect(typeof config === 'object').toBe(true);
});

test('Use of SD resolution', () => {
  expect(config.width).toBe(640);
  expect(config.height).toBe(480);
});