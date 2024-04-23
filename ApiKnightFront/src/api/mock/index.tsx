import request from '@/api/request'
import { IMockTransfer } from '..'
import { AxiosResponse } from 'axios'
import { Result } from '../request.type'

/**
 * 创建Mock
 * @param options mock请求的参数
 * @returns
 */
export async function createMock(
  options: IMockTransfer,
): Promise<Result<never>> {
  const resp: AxiosResponse<Result<never>> = await request.post(
    '/v1/mock/create',
    options,
  )
  return resp.data
}
