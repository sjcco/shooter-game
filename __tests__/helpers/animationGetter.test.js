/**
 * @jest-environment jsdom
 */

import getAnimation from '../../src/helpers/animationGetter';

test('Return string', () => {
  expect(typeof getAnimation('right', 'player', 'idle') === 'string').toBe(true);
});

test('Returns correct direction', () => {
  expect(getAnimation('right', 'player', 'idle').includes('right')).toBe(true);
});