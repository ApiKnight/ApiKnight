import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

//一级路由
import Home from './pages/home/index.tsx'
import Project from './pages/project/index.tsx'
import User from './pages/user/index.tsx'
//二级路由
import ApiMgt from './pages/project/apiMgt/index.tsx'
import MemberMgt from './pages/project/memberMgt/index.tsx'
import ProjectMgt from './pages/project/projectMgt/index.tsx'
//三级路由
import CertainApi from './pages/project/apiMgt/certainApi/index.tsx'
import Overview from './pages/project/apiMgt/overview/index.tsx'
//四级路由
import Document from './pages/project/apiMgt/certainApi/document/index.tsx'
import Test from './pages/project/apiMgt/certainApi/test/index.tsx'
import Mock from './pages/project/apiMgt/certainApi/mock/index.tsx'
import AuthRoute from './components/AuthRoute.tsx'
import Login from './pages/user/login/index.tsx'
import Index from '@/pages/index'

const Layout: React.FunctionComponent = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
const App: React.FunctionComponent = () => {
  return (
    <div>
      {/* 1.直接在App中配置二级路由 2.在对应页面中使用Switch包裹后配置二级路由，本项目采用法1 */}
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Home */}
          <Route index element={<Index />}></Route>
          <Route path='/main' element={<Home />}></Route>
          {/* Project */}
          <Route
            path='/project'
            element={
              <AuthRoute>
                <Project />
              </AuthRoute>
            }
          >
            <Route path='/project/apiMgt' element={<ApiMgt />}>
              <Route
                path='/project/apiMgt/overview'
                element={<Overview />}
              ></Route>
              <Route path='/project/apiMgt/certainApi' element={<CertainApi />}>
                <Route
                  path='/project/apiMgt/certainApi/document'
                  element={<Document />}
                ></Route>
                <Route
                  path='/project/apiMgt/certainApi/test'
                  element={<Test />}
                ></Route>
                <Route
                  path='/project/apiMgt/certainApi/mock'
                  element={<Mock />}
                ></Route>
              </Route>
            </Route>
            <Route path='/project/memberMgt' element={<MemberMgt />}></Route>
            <Route path='/project/projectMgt' element={<ProjectMgt />}></Route>
          </Route>

          {/* User */}
          <Route
            path='/user'
            element={
              <AuthRoute>
                <User />
              </AuthRoute>
            }
          ></Route>
          <Route path='/user/login' element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
