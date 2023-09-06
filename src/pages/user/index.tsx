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
import { createAllMonitor } from '../../../sdk/index'

const { Header, Content, Footer } = Layout

const User: React.FunctionComponent = () => {
  const [projectList, setProjectList] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user_info, setUserInfo] = useState({})
  const state = useLocation().state
  const user_id = localStorage.getItem('user_id')
  console.log('userid', user_id, state)
  createAllMonitor('/user').start()
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const updateUserInfo = () => {
    getUserInfo(user_id).then((res: any) => {
      let data = res.data.data
      setUserInfo(data)
      // 项目按照创建时间，后创建的在前面
      let sortedProjectList = data.project_list
      sortedProjectList.sort((a: any, b: any) => {
        const aTime = new Date(a.create_time).getTime()
        const bTime = new Date(b.create_time).getTime()
        return bTime - aTime
      })
      setProjectList(sortedProjectList)
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

      <Layout
        className='layout'
        style={{ minHeight: '100%', overflow: 'scroll' }}
      >
        {/* <Header
          style={{
            // backgroundColor: '#ffffff',
            padding: 0
          }}> */}
        <HeaderNav user_info={user_info} />
        {/* </Header> */}
        <div className='content-wrap' style={{ height: '100%', flex: '1' }}>
          <Content
            className='content'
            style={{
              padding: '50px 50px',
              // justifyContent: 'center',
              // alignItems: 'center',
              position: 'relative',
            }}
          >
            <div className='title'>
              <div className='my-project'>我的项目</div>
              <Button
                icon={<PlusOutlined />}
                type='primary'
                // style={{
                //   backgroundColor: '@theme-primary-color',
                //   color: '#ffffff',
                // }}
                className='button'
                onClick={() => openModal()}
              >
                新建项目
              </Button>
              {/* <div className='create-project'>
             
            </div> */}
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
                        iconPath={value.iconPath}
                        project_img={value.project_img}
                      ></ProjectItem>
                    </div>
                  )
                })
              ) : (
                <div className='item-empty'>
                  <EmptyShow />
                </div>
              )}
            </div>
          </Content>
        </div>

        <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.3)' }}>
          ApiKnight ©2023 Created by ApiKnight
        </Footer>
      </Layout>
    </div>
  )
}

export default User
