import request from '@/api/request'
import { IMockTransfer } from '..'

/**
 * 发送mock请求
 * @param options mock请求的参数
 * @returns
 */
export async function mockRequest(options: IMockTransfer): Promise<any> {
  const { url, method } = options
  const { data } = await request.post('/v1/mock/real', {
    url: url,
    method: method,
  })
  return data
}
