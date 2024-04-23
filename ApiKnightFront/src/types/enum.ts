// 请求参数类别
export enum NavType {
  Params = 'Params',
  Body = 'Body',
  Cookie = 'Cookie',
  Header = 'Header',
  Auth = 'Auth',
}

// 接口状态类型
export enum StatusValue {
  RELEASE = 2,
  TESTING = 1,
  DEPRECATE = 3,
  DEVELOPING = 0,
}
