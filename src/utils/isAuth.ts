import getSelfInfo from '@/api/getSelfInfo'
export async function isAuth() {
  console.log(
    'token',
    localStorage.getItem('token'),
    'userid',
    localStorage.getItem('user_id'),
  )
  const { data } = await getSelfInfo()
  data.code === 200
    ? ''
    : (localStorage.setItem('token', ''), localStorage.setItem('user_id', ''))
  console.log('datacode', data.code === 200)

  return data.code === 200
}
