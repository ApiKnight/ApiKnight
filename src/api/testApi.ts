import request from './request'
/**
 * 提供HTTP 接口描述(URL、Method、参数、返回结构等)后，服务器根据接口描述代理转发请求，返回结果
 * @param {Object} requestObj 请求所需参数
 * @returns
 */
type requestType = {
  cookie:any,
  url: string
  method: string
  params: any
  data: any
  header: any
}

// const testApi = () => {
//   return request.post('v1/mock/real', {url: "http://v.juhe.cn/calendar/day",method: "POST",data:{
//     "key": "bed4ca7594bf9198ce6e3879633ec21f",
//     "date": "2015-1-1"
//  }}, {})

const testApi = (requestObj: requestType) => {
  return request.post(
    'v1/mock/real',
    {
      url: requestObj.url,
      method: requestObj.method,
      params: requestObj.params,
    },
    {},
  )
}
export default testApi
