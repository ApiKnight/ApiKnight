// 前后端交互的API信息结构
export interface IRawApiInfo {
  id: string
  folder_id: string
  create_user: string
  create_time: string
  operate_time: string
  operate_user: string
  request_data: string
  response_data: string
  project_id: number
  description: string
  name: string
}

// 用户信息结构
export interface IUserInfo {
  avatar_url: string
  email: string
  id: string
  phone: string
  username: string
}

// 目录信息结构
export interface IFolderInfo {
  id: string
  name: string
  parent_id: string | null
  project_id: number
}

// 获取项目信息接口传输类型
export interface IGetProjectInfoTransfer {
  api_list: IRawApiInfo[]
  create_user: IUserInfo
  description: string
  folder_list: IFolderInfo[]
  id: number
  project_img: string
  projectname: string
  role: number
}
