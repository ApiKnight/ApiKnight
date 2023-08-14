// import React, { useEffect, useState } from 'react'
// import './index.less'
// import HeaderNav from '@/components/HeaderNav'
// import getUserInfo from '@/api/getUserInfo'

// const User = () => {
//   const [userInfo, setUserInfo] = useState({})
//   useEffect(() => {
//     getUserInfo(localStorage.getItem('user_id')).then((res) => {
//       console.log(res.data.data);
//       let data = res.data.data
//       setUserInfo(data)
//     })
//   }, [])
//   return (
//     <div className='user'>
//       个人中心
//       <div className='user_id'>用户id：{userInfo.id}</div>
//       <div className='username'>用户名：{userInfo.username}</div>
//       <div className='avatar'>头像路径：{userInfo.avatar_url}</div>
//       <div className='phone'>手机号：{userInfo.phone}</div>
//       <div className='phone'>邮箱：{userInfo.email}</div>
//     </div>
//   )
// }

// export default User

import React, { useState, useEffect } from 'react'
import './index.less'
import ProjectItem from '@/components/ProjectItem'
import { Layout, Button } from 'antd'
import HeaderNav from '@/components/HeaderNav'
import { PlusOutlined } from '@ant-design/icons'
import CreateProject from '@/components/CreateProject'
import getUserInfo from '@/api/getUserInfo'
import { useLocation } from 'react-router-dom'
const { Header, Content, Footer } = Layout

const User: React.FunctionComponent = () => {
  const [projectList, setProjectList] = useState<ProjectItemType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user_info, setUserInfo] = useState({})
  const {state} = useLocation()
  if(!state){
    return (
      <div>
        请传入id
      </div>
    )
  }

  const {user_id} = state
  if(!user_id){
    return (
      <div>
        请传入id
      </div>
    )
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // const updateProjectList = () => {
  //   request.get('v1/project/list').then((res) => {
  //     let { data } = res.data
  //     let list = []
  //     data.forEach((value) => {
  //       list.push({
  //         name: value.projectname,
  //         dec: value.description,
  //         project_id: value.id,
  //         iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg',
  //       })
  //     })
  //     setProjectList(list)
  //   })
  // }

  useEffect(() => {
    //有token，先登录再拉取项目列表
      // updateProjectList()
      getUserInfo(user_id).then((res) => {
        let data = res.data.data
        setUserInfo(data)
        setProjectList(data.project_list)
      })
  }, [])
  return (
    <>
      <Layout className='layout'>
        <Header
          style={{
            backgroundColor: '#ffffff',
            height: '80px',
          }}
        >
          <HeaderNav user_info={user_info} />
        </Header>
        <Content style={{ padding: '50px 50px', justifyContent: 'center' }}>
          <div className='Content-title'>
            <strong>我的项目</strong>
            <Button
              icon={<PlusOutlined />}
              style={{ backgroundColor: '#9373ee', color: '#ffffff' }}
              onClick={() => openModal()}
            >
              新建项目
            </Button>
          </div>
          <ul>
            {projectList.map((value, index) => {
              return (
                <li className='projectListItem' key={value.id}>
                  <ProjectItem
                    name={value.name}
                    dec={value.dec}
                    project_id={value.id}
                    iconPath={value.iconPath}
                  ></ProjectItem>
                </li>
              )
            })}
          </ul>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ApiKnight ©2023 Created by ApiKnight
        </Footer>
      </Layout>
      {/* <Counter /> */}

      <CreateProject
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        getUserInfo={getUserInfo}
      />
    </>
  )
}

export default User
