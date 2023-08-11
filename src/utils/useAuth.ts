export const useAuth = () => {
  return (!!localStorage.getItem('token')) && (!!localStorage.getItem('user_id'))
}
