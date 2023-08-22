import getSelfInfo from '@/api/getSelfInfo'
export async function useAuth() {
  console.log(
    'token',
    localStorage.getItem('token'),
    'userid',
    localStorage.getItem('user_id'),
  )
  var { data } = await getSelfInfo()
  data.code === 200
    ? ''
    : (localStorage.setItem('token', ''), localStorage.setItem('user_id', ''))
    console.log('datacode',data.code === 200);
    
  return data.code === 200
}
