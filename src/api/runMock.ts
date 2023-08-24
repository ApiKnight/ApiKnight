import request from './request'
/**
 * 执行mock
 * @param api_id
 * @param project_id
 * @param url
 * @returns
 */
interface runMockType{
      project_id: string,
      api_id:string,
      url:string 
    }
const runMock = (runMockObj:runMockType) => {
  return request.post('v1/mock/run', runMockObj)
}
export default runMock