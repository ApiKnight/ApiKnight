import {
  IAPIInfo,
  MetaInfo,
  NormalParamsType,
  RequestParamsType,
} from '@/types/api'
import { IAPIInfoPlus } from './type'
import { StatusValue } from '@/types/enum'
import { Method } from '@/types/components'
import { getRangeRandom } from '../math'

/**
 *  解析前端定义的请求信息类型对象
 * @param dataJsonStr 前端定义的请求信息类型对象的json字符串
 * @returns IAPIInfoPlus类型工具类
 */
export function parseAPIInfo(dataJsonStr: string): IAPIInfoPlus {
  const res = {} as IAPIInfoPlus
  try {
    const apiData = JSON.parse(dataJsonStr)
    res.value = apiData
    res.getMethod = () => apiData.apiInfo.base.method
    res.getPath = () => apiData.apiInfo.base.path
    res.getFullUrl = () => res.getPath() + '/' + apiData.apiInfo.base.prefix
    return res
  } catch (e) {
    throw new Error(`parseAPIInfo Fail:${e.message}`)
  }
}

/**
 * 将swagger2.0的JSON文档转换成ApiKnight的JSON文档
 * @param dataJsonStr Swagger2.0文档JSON
 * @param ownerId 接口拥者的id
 * @returns
 */
export function parseSwaggerDoc(dataJsonStr: string, ownerId): IAPIInfo[] {
  const rst = {} as IAPIInfo[]
  const swaggerObj = JSON.parse(dataJsonStr)
  const basePath = swaggerObj.Path
  const swaggerPaths = swaggerObj.paths
  Object.keys(swaggerPaths).map((pathKey: string) => {
    const rstItem = {} as IAPIInfo
    const fullInfo = swaggerPaths[pathKey]
    const method = fullInfo[0]
    const needInfo = fullInfo[method]
    // 接口本身的描述信息
    const meta_info: MetaInfo = {
      created: new Date().getTime(),
      status: StatusValue.DEVELOPING,
      owner_id: ownerId,
      tags: ['默认标签'],
      desc: needInfo.description,
    }

    // 接口请求信息
    const apiInfo: IAPIInfo['apiInfo'] = {
      base: {
        method: method as Method,
        path: pathKey.slice(1),
        prefix: basePath,
      },
      request: parseSwaggerParameters(needInfo.parameters),
      response: ResponseType,
    }
  })

  return rst
}

function parseSwaggerParameters(swaggerParamsJsonStr): RequestParamsType {
  const rst = {} as RequestParamsType
  const swaggerParams = JSON.parse(swaggerParamsJsonStr)
  const paramsInfo: NormalParamsType[] = []
  const headersInfo: NormalParamsType[] = []
  const cookieInfo: NormalParamsType[] = []
  const bodyInfo: NormalParamsType[] = []

  swaggerParams.map((paramItem) => {
    const paramInfo: NormalParamsType = {} as NormalParamsType
    paramInfo.id = Date.now() + getRangeRandom(1000, 9999)
    paramInfo.paramName = paramItem.name
    paramInfo.required = paramItem.required
  })
}

// const api_crete = function ({ project_id, folder_id, request_data, response_data, description, name }) {
//     return {
//         project_id,
//         folder_id,
//         request_data,
//         response_data,
//         description,
//         name,
//     }
// }
// const request_data_mo = function ({ path, prefix, owner_id, desc, method, header_list, params_list, bodyresult, respnseresult }) {
//     return {
//         meta_info: {
//             // 创建时间：13位的时间戳
//             created: Date.now(),
//             status: 0,
//             // 所有者id
//             owner_id,
//             // 标签，字符串形式的数组
//             tags: ['默认标签'],
//             // 接口描述
//             desc,
//         },
//         apiInfo: {
//             base: {
//                 // 请求方法
//                 method,
//                 // 完整url地址为：prefix + '/' + path
//                 path,
//                 prefix,
//             },
//             request: {
//                 // 请求的url参数
//                 /*
//                 http://xxx.com?id=1&name=LuoKing
//                 中描述 id=1&name=LuoKing 这部分的信息
//                 */
//                 params: params_list,
//                 // 请求的header部分
//                 headers: header_list,
//                 cookie: [
//                 ],
//                 // 纯文本的请求体内容
//                 body: bodyresult,
//             },
//             response: {
//                 // 响应状态码
//                 status: 200,
//                 // 响应体内容
//                 body: respnseresult
//             },
//         },
//     }
// }
// function jiexi(target) {
//     if (target.type !== 'object') {
//         return target.type
//     } else {
//         let mdidle = {}
//         for (let i in target.properties) {
