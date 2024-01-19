import request from '@/api/request'
import { Method } from '@/types/components'
import { AxiosResponse } from 'axios'

/**
 * 通过mock接口实现基于服务器的代理发送请求（处理跨域问题）
 * @param options 请求参数
 * @returns 返回的数据
 */
interface Options {
  url: string
  method: Method
  headers: string | null | Record<string, string>
  data: string
}
/* eslint-disable */
export function requestByServerProxy(
  options: Options,
): Promise<AxiosResponse<any>> {
  return request.post('/v1/mock/real', options, {})
}
