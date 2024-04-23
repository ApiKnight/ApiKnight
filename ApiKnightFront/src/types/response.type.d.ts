interface ApiType {
  id: string
  folder_id: string
  create_time: string
  create_user: string | CreateUser
  operate_user: string
  request_data: string
  response_data: string
  project_id: number
  description: string
  name: string
  operate_time?: string
}

interface FolderType {
  id: string
  project_id: number
  name: string
  parent_id: string
}

interface QueryResp {
  id: number
  projectname: string
  description: string
  create_time: string
  create_user: CreateUser | string
  project_img: string
  role: number
  api_list: Array<ApiType>
  project_id: number
  folder_list: Array<FolderType>
}

interface QuerySummary {
  project_img: string
  projectname: string
  description: string
  create_time: string
  apis_count: number
  members_count: number
}

interface MemberList {
  avatar_url: string
  name: string
  user_id: string
  role: number
}

interface CreateUser {
  id: string
  email: string
  phone: string
  username: string
  avatar_url: string
}

interface ProjectListItem {
  id: string
  create_time: string
  avatar_url: string
  description: string
  project_img: string
  projectname: string
  role: string
  create_user: CreateUser
}

interface QueryUser {
  id: string
  username: string
  email: string
  avatar_url: string
  phone: string
  project_list: ProjectListItem[]
}

interface LoginReturnType {
  user: Omit<QueryUser, 'project_list'>
  token: string
}

interface WListItem {
  id: string
  status: string
  create_time: string
  approve_time: string | null
  project_id: number
  name: string
}

type QueryRole = {
  role: number
}

interface DfData {
  data: string
  type: string
}

export type {
  QueryResp,
  ApiType,
  FolderType,
  QuerySummary,
  MemberList,
  QueryUser,
  ProjectListItem,
  QueryUser,
  LoginReturnType,
  CreateUser,
  WListItem,
  QueryRole,
  DfData,
}
