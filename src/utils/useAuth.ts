export const useAuth = () => {
  return !!localStorage.getItem('token')
}
