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
