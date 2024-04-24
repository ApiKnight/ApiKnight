import {
  IAPIInfo,
  MetaInfo,
  NormalParamsType,
  RequestParamsType,
} from '@/types/api'
import { IAPIInfoPlus, SwaggerDoc, SwaggerParameter } from './type'
import { StatusValue } from '@/types/enum'
import { Method } from '@/types/components'
import { getRangeRandom } from '../math'
// import { parse_swagger_parameters } from '@apiknight/compute-module'

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
 * @returns Map<目录名 string, 目录下的所有接口列表 IAPIInfo[]>
 */
export function parseSwaggerDoc(
  swaggerDoc: SwaggerDoc,
  ownerId: string,
): Map<string, IAPIInfo[]> {
  const rst = new Map<string, IAPIInfo[]>()
  const basePath = swaggerDoc.Path
  const swaggerPaths = swaggerDoc.paths
  // debugger
  Object.keys(swaggerPaths).map((pathKey: string) => {
    const fullInfo = swaggerPaths[pathKey]
    const method = Object.keys(fullInfo)[0]
    const needInfo = fullInfo[method]
    console.log(needInfo.parameters)
    console.log(parseSwaggerParameters(needInfo.parameters))
    // 接口本身的描述信息
    const meta_info: MetaInfo = {
      created: new Date().getTime(),
      status: StatusValue.DEVELOPING,
      owner_id: ownerId,
      tags: ['默认标签'],
      desc: needInfo?.description,
      name: needInfo?.summary,
      notes: '从swagger2.0文档转换而来',
    }

    // 接口请求信息
    const apiInfo: IAPIInfo['apiInfo'] = {
      base: {
        method: method.toUpperCase() as Method,
        path: pathKey.slice(1),
        prefix: basePath || '',
      },
      request: parseSwaggerParameters(needInfo.parameters),
      response: { status: 200, body: '{}' },
    }
    const folderName = needInfo?.tags?.[0] || '根目录'
    if (rst.has(folderName)) {
      rst.get(folderName).push({ meta_info, apiInfo })
    } else {
      rst.set(folderName, [{ meta_info, apiInfo }])
    }
  })
  return rst
}

/**
 * 解析 Swagger 参数
 *
 * @param swaggerParams Swagger 参数数组
 * @returns 返回解析后的请求参数类型对象
 */
function parseSwaggerParameters(
  swaggerParams: SwaggerParameter[],
): RequestParamsType {
  const paramsInfo: NormalParamsType[] = []
  const headersInfo: NormalParamsType[] = []
  const cookieInfo: NormalParamsType[] = []
  let bodyInfo: string = ''

  swaggerParams.forEach((paramItem) => {
    const singleApiInfo: NormalParamsType = {} as NormalParamsType
    singleApiInfo.id = Date.now() + getRangeRandom(1000, 9999)
    singleApiInfo.paramName = paramItem?.name
    singleApiInfo.required = paramItem?.required
    singleApiInfo.desc = paramItem?.description
    singleApiInfo.type = paramItem?.type
    singleApiInfo.value = paramItem?.['x-example']?.[0]
    switch (paramItem.in) {
      case 'query':
        paramsInfo.push(singleApiInfo)
        break
      case 'header':
        headersInfo.push(singleApiInfo)
        break
      case 'cookie':
        cookieInfo.push(singleApiInfo)
        break
      case 'body':
        bodyInfo = '{}'
    }
  })
  const rst = {
    params: paramsInfo,
    headers: headersInfo,
    cookie: cookieInfo,
    body: bodyInfo,
  }
  return rst
}
