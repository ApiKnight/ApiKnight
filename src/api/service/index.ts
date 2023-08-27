import request from '@/api/request'

/**
 * 通过mock接口实现基于服务器的代理发送请求（处理跨域问题）
 * @param options 请求参数
 * @returns 返回的数据
 */
export function requestByServerProxy(options: any): Promise<any> {
  return request.post('/v1/mock/real', options)
}
