/**
 * @jest-environment jsdom
 */

import sortByScore from '../../src/helpers/sortByScore';

const data = [
  {
    user: 'John Doe',
    score: 42,
  },
  {
    user: 'Peter Parker',
    score: 35,
  },
  {
    user: 'Wonder Woman',
    score: 50,
  },
];

let undef;

const string = 'test';

test('Retuns an array', () => {
  expect(Array.isArray(sortByScore(data))).toBe(true);
});

test('Array is sorted', () => {
  const arr = sortByScore(data);
  expect(arr[0].score).toBeGreaterThan(arr[1].score);
});

test('Throws error when argument is not an array', () => {
  expect(() => {
    sortByScore(undef);
  }).toThrow();
  expect(() => {
    sortByScore(string);
  }).toThrow();
});
