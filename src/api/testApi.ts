import request from './request'
/**
 * 提供HTTP 接口描述(URL、Method、参数、返回结构等)后，服务器根据接口描述代理转发请求，返回结果
 * @param {Object} requestObj 请求所需参数
 * @returns
 */
type requestType={
    url:string,
    method:string,
    params:Object,
    data:Object,
    header:Object
}
// const testApi = (requestObj:requestType) => {
const testApi = () => {

  return request.post('v1/mock/real', {url: "http://v.juhe.cn/calendar/day",method: "POST",data:{
    "key": "5b0588d13fa598a5423a41d0346a2cae",
    "date": "2015-1-1"
 }}, {})
  // return request.post('v1/mock/real', {
  //   "url": "https://jsonplaceholder.typicode.com/todos/1",
  //   "method": "GET"
  // }, {})
}
export default testApi
