import { getRankings } from '../../src/sys/api';

test('Should return an Array', () => {
  // eslint-disable-next-line no-unused-expressions
  expect(Array.isArray(getRankings())).toBeTruthy;
});
