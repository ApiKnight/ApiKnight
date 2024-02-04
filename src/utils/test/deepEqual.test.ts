import { deepEqual } from '../deepEqual'
import { expect, test } from 'vitest'

test('utils/deepEqual', () => {
  const Obj_a = {
    a: 'string',
    b: 1,
    c: true,
    d: [
      {
        a: 'string',
        b: 1,
        c: true,
      },
      {
        a: 'string',
        b: 2,
        c: false,
      },
    ],
    e: this,
    f: null,
    g: undefined,
  }
  const Obj_b = {
    a: 'string',
    b: 1,
    c: true,
    d: [
      {
        a: 'string',
        b: 1,
        c: true,
      },
      {
        a: 'string',
        b: 2,
        c: false,
      },
    ],
    e: this,
    f: null,
    g: undefined,
  }
  expect(deepEqual(Obj_a, Obj_b)).toBe(true)
})
