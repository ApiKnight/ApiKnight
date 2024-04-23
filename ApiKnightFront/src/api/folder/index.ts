import { IApiResult } from '..'
import request from '../request'

/**
 * 根据文件夹id获取文件夹名字
 * @param folderId 文件夹id
 * @returns 响应体
 */
export async function getFolderName(folderId: string): Promise<string> {
  const { data } = await request.post<string>('/v1/folder/queryname', {
    folder_id: folderId,
  })
  return data.data
}

export async function createFolder(
  projectId: number,
  parentId: string,
  name: string,
): Promise<IApiResult<unknown>> {
  const { data } = await request.post('/v1/folder/create', {
    project_id: projectId,
    parent_id: parentId,
    name: name,
  })
  return data
}

export async function updataFolder(
  folder_id: string,
  parent_id: string,
  name: string,
) {
  const { data } = await request.post(
    '/v1/folder/update',
    {
      folder_id,
      parent_id,
      name,
    },
    {},
  )
  return data
}
