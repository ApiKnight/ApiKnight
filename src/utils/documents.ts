import { cloneDeep } from 'lodash'
import { getRangeRandom } from './math'
import { IAPIInfo } from '@/types/api'

const apiDataTemplate: IAPIInfo = {
  meta_info: {
    created: new Date().getTime(),
    status: 0,
    owner_id: '',
    tags: ['默认标签'],
    desc: '',
  },
  apiInfo: {
    base: {
      method: 'GET',
      path: '',
      prefix: '',
    },
    request: {
      params: [
        {
          paramName: '参数名',
          type: 'string',
          desc: '',
          required: false,
          value: '',
          id: new Date().getTime() + getRangeRandom(1, 1000),
        },
      ],
      headers: [
        {
          paramName: '参数名',
          type: 'string',
          desc: '',
          required: false,
          value: '',
          id: new Date().getTime() + getRangeRandom(1, 1000),
        },
      ],
      cookie: [
        {
          paramName: '参数名',
          type: 'string',
          desc: '',
          required: false,
          value: '',
          id: new Date().getTime() + getRangeRandom(1, 1000),
        },
      ],
      body: '{}',
    },
    response: {
      status: 0,
      body: '',
    },
  },
}

/**
 * 获取一个基于模板的api信息对啊ing
 * @param ownerId 接口所有者id
 * @returns api信息对象
 */
export function getInitialApiInfoObj(ownerId: string): IAPIInfo {
  if (ownerId === undefined || ownerId === null || ownerId === '') {
    throw new Error(
      `getInitialApiInfoObj: 必选参数 userId 不完整, 不能为 ${ownerId}`,
    )
  }
  const res = cloneDeep(apiDataTemplate)
  res.meta_info.owner_id = ownerId
  return res
}
