/**
 * 获取指定范围内的随机数
 * @param min 下限
 * @param max 上限
 * @returns 随机值
 */
export function getRangeRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 时间戳转时间
 * @param timestamp 时间戳
 * @returns YYYY-MM-dd hh:mm
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${year}-${month}-${day} ${hours}:${minutes}`
}
