import request from '@/api/request'
import { IMockTransfer } from '..'

/**
 * 创建Mock
 * @param options mock请求的参数
 * @returns
 */
export async function createMock(options: IMockTransfer): Promise<any> {
  const { data } = await request.post('/v1/mock/create', options)
  return data
}
