import { describe, it, expect } from 'vitest'
import { getRangeRandom, formatTime } from '../math'

describe('Utilities', () => {
  // Test for getRangeRandom function
  describe('getRangeRandom', () => {
    it('should return a random number within the specified range', () => {
      const min = 1
      const max = 10
      const randomValue = getRangeRandom(min, max)
      expect(randomValue).toBeGreaterThanOrEqual(min)
      expect(randomValue).toBeLessThan(max)
    })
  })

  // Test for formatTime function
  describe('formatTime', () => {
    it('should convert a timestamp to a formatted string', () => {
      // 使用UTC时间构造时间戳
      const timestamp = Date.UTC(2023, 3, 1, 12, 30) // 注意：月份从0开始，即3代表4月
      const formatted = formatTime(timestamp)
      // 预期UTC格式化时间
      const expected = '2023-4-1 12:30'
      expect(formatted).toBe(expected)
      expect(true).toBe(true)
    })
  })
})
