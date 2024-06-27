import { expect, test, describe } from '@jest/globals';

const mock = 1;
describe('тест1', () => {
  test('Вхождение', () => {
    const num = 1;

    expect(num).toBe(mock);
  });
});
