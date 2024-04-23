import request from '@/api/request'
import { SearchUsersByEmail } from './type'

export async function sendEamil(email: string, projectid: number) {
  const { data } = await request.post(
    '/v1/invite/sending',
    { email, projectid },
    {},
  )
  return data
}

export async function searchUsersByEmail(email: string) {
  const { data } = await request.post<SearchUsersByEmail[]>(
    '/v1/user/searchUsersByEmail',
    { email },
    {},
  )
  return data
}

export async function apiReceive(projectid: number) {
  const { data } = await request.post('/v1/invite/receive', { projectid }, {})
  return data
}
