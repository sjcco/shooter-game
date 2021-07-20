import { getRankings } from "../../src/sys/api";

test('Should return an Array', () => {
  expect(Array.isArray(getRankings())).toBeTruthy;
});
