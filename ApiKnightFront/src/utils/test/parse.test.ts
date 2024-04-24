import { describe, it, expect } from 'vitest'
import { parse_swagger_parameters } from '@apiknight/compute-module'

describe('parse', () => {
  // Test for getRangeRandom function
  describe('xxx', () => {
    it('should return a random number within the specified range', () => {
      const obj = [
        {
          in: 'body',
          schema: {
            $ref: '#/definitions/RequestApisDelete',
          },
          name: 'body',
          required: true,
          description: '',
        },
      ]
      expect(parse_swagger_parameters(obj)).toBe({
        params: [],
        headers: [],
        cookie: [],
        body: '{}',
      })
    })
  })
})
