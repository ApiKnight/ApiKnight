import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface Result<T> {
	code: number
	msg: string
	result: T
}
// 导出Request，传入配置以创建实例
export class Request {
	// axios 实例
	instance: AxiosInstance
	// 基础配置，url和超时时间
	// 测试接口，id:bolpgeq7pltiflnj,  secret:d0JZQ2N1bUQ2djJBSXFFSm92ZVpWdz09
	// https://www.mxnzp.com/api/holiday/single/20181121?ignoreHoliday=false&app_id=bolpgeq7pltiflnj&app_secret=d0JZQ2N1bUQ2djJBSXFFSm92ZVpWdz09
	baseConfig: AxiosRequestConfig = {
		baseURL: 'https://www.mxnzp.com/api/',
		timeout: 60000
	}

	constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(Object.assign(this.baseConfig, config))

		//请求拦截，设置请求头，处理统一的请求数据
		this.instance.interceptors.request.use(
			// config:AxiosRequestConfig
			(config: any) => {
				// 判断token
				const token = localStorage.getItem('token') as string
				if (token) {
					config.headers!.Authorization = token
				}
				console.log('请求拦截成功', config)
				return config
			},
			(err: any) => {
				// 错误提示，待加
				return Promise.reject(err)
			}
		)

		//响应拦截,根据响应状态码做统一的提示信息，整理响应数据
		this.instance.interceptors.response.use(
			(res: AxiosResponse) => {
				// 统一处理响应数据
				// 系统如果有自定义code也可以在这里处理
				console.log('响应拦截成功', res)
				return res
			},
			(err: any) => {
				// 这里用来处理http常见错误，进行全局提示
				let message = ''
				switch (err.response.status) {
					case 400:
						message = '请求错误(400)'
						break
					case 401:
						message = '未授权，请重新登录(401)'
						// 这里可以做清空storage并跳转到登录页的操作
						break
					case 403:
						message = '拒绝访问(403)'
						break
					case 404:
						message = '请求出错(404)'
						break
					case 408:
						message = '请求超时(408)'
						break
					case 500:
						message = '服务器错误(500)'
						break
					case 501:
						message = '服务未实现(501)'
						break
					case 502:
						message = '网络错误(502)'
						break
					case 503:
						message = '服务不可用(503)'
						break
					case 504:
						message = '网络超时(504)'
						break
					case 505:
						message = 'HTTP版本不受支持(505)'
						break
					default:
						message = `连接出错(${err.response.status})!`
				}
				// 错误信息提示，待加
				// 这里是AxiosError类型，所以一般我们只reject我们需要的响应
				return Promise.reject(err.response)
			}
		)
	}

	// 定义请求方法
	request(config: AxiosRequestConfig): Promise<AxiosResponse> {
		return this.instance.request(config)
	}

	get<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<Result<T>>> {
		return this.instance.get(url, config)
	}

	post<T = any>(
		url: string,
		config?: AxiosRequestConfig,
		data?: any
	): Promise<AxiosResponse<Result<T>>> {
		return this.instance.post(url, data, config)
	}

	put<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<Result<T>>> {
		return this.instance.put(url, data, config)
	}

	delete<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<Result<T>>> {
		return this.instance.delete(url, config)
	}
}

// 默认导出Request实例
export default new Request({})
