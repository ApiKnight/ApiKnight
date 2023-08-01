export const useAuth = () => {
	return !!localStorage.getItem('login_token')
}
