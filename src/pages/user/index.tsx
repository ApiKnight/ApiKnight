import React, { useState, useEffect } from 'react'
import './index.less'
import ProjectItem from '@/components/ProjectItem'
import { Layout, Button } from 'antd'
import HeaderNav from '@/components/HeaderNav'
import { PlusOutlined } from '@ant-design/icons'
import CreateProject from '@/components/CreateProject'
import getUserInfo from '@/api/getUserInfo'
import { useLocation } from 'react-router-dom'
import EmptyShow from '@/components/EmptyShow'

const { Header, Content, Footer } = Layout

const User: React.FunctionComponent = () => {
  const [projectList, setProjectList] = useState<ProjectItemType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user_info, setUserInfo] = useState({})
  const state = useLocation().state
  const { user_id } = state
  console.log('userid', user_id)

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const updateUserInfo=()=>{
    getUserInfo(user_id).then((res) => {
      let data = res.data.data
      setUserInfo(data)
      setProjectList(data.project_list)
    })
  }
  useEffect(() => {
    //有token，先登录再拉取项目列表
    // updateProjectList()
    updateUserInfo()
  }, [])

  return (
    <div className='user'>
      <CreateProject
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        updateUserInfo={updateUserInfo}
        user_id={user_id}
      />

      <Layout className='layout'>
        {/* <Header
          style={{
            // backgroundColor: '#ffffff',
            padding: 0
          }}> */}
          <HeaderNav user_info={user_info} />
        {/* </Header> */}
        <Content className='content' style={{ padding: '50px 50px', justifyContent: 'center',alignItems:'center',position:'relative' }}>
          <div className='title'>
            <div className='my-project'>我的项目</div>
            <div className="create-project">
            <Button
              icon={<PlusOutlined />}
              style={{ backgroundColor: '#9373ee', color: '#ffffff' }}
              className='button'
              onClick={() => openModal()}>
              新建项目
            </Button>
            </div>
          </div>
          <div className='list'>
            {projectList.length ? (
              projectList.map((value, index) => {
                return (
                  <div className='item' key={value.id}>
                    <ProjectItem
                      name={value.projectname}
                      dec={value.description}
                      project_id={value.id}
                      iconPath={value.iconPath}></ProjectItem>
                  </div>
                )
              })
            ) : (
                <div  className='item-empty'>
              <EmptyShow />
                </div>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ApiKnight ©2023 Created by ApiKnight
        </Footer>
      </Layout>
    </div>
  )
}

export default User
