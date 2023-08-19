/**
 * 获取指定范围内的随机数
 * @param min 下限
 * @param max 上限
 * @returns 随机值
 */
export function getRangeRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}
