import { isValid, convertToSemver } from '../src';

describe.each([
  ['1.0.dev456', true, '1.0+dev456'],
  ['1.0a1', true, '1.0-alpha.1'],
  ['1.0a2.dev456', true, '1.0-alpha.2+dev456'],
  ['1.0a12.dev456', true, '1.0-alpha.12+dev456'],
  ['1.0a12', true, '1.0-alpha.12'],
  ['1.0b1.dev456', true, '1.0-beta.1+dev456'],
  ['1.0b2', true, '1.0-beta.2'],
  ['1.0b2.post345.dev456', true, '1.0-beta.2+post345-dev456'],
  ['1.0b2.post345', true, '1.0-beta.2+post345'],
  ['1.0rc1.dev456', true, '1.0-rc.1+dev456'],
  ['1.0rc1', true, '1.0-rc.1'],
  ['1.0', true, '1.0'],
  ['1.0+abc.5', true, '1.0+abc-5'],
  ['1.0+5', true, '1.0+5'],
  ['1.0.post456.dev34', true, '1.0+post456-dev34'],
  ['1.0.post456', true, '1.0+post456'],
  ['1.1.dev1', true, '1.1+dev1'],
  ['1.2.0', true, '1.2.0'],
  ['2!1.0', true, '2.1.0'],
  ['15', true, '15'],
  ['invalid', false, undefined],
])('version: %s', (input, valid, converted) => {
  test(`isValid = ${valid}`, () => {
    expect(isValid(input)).toBe(valid);
  });

  test(`normalise(${input}) = ${converted}`, () => {
    expect(convertToSemver(input)).toEqual(converted);
  });
});
