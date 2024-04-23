import request from '../request'
import { Result } from '../request.type'

export async function getFolders(folderId: string): Promise<Result<string>> {
  const { data } = await request.post<string>('/v1/folder/queryname', {
    folder_id: folderId,
  })
  return data
}
