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

const { Content, Footer } = Layout

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
      const data = res.data.data
      setUserInfo(data)
      // 项目按照创建时间，后创建的在前面
      const sortedProjectList = data.project_list
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
        style={{ minHeight: '100%', overflow: 'scroll' }}>
        <HeaderNav user_info={user_info} />
        <div className='content-wrap' style={{ height: '100%', flex: '1' }}>
          <Content
            className='content'
            style={{
              padding: '50px 50px',
              position: 'relative',
            }}>
            <div className='title'>
              <h1 className='my-project'>我的项目</h1>
              <Button
                icon={<PlusOutlined />}
                type='primary'
                className='button'
                onClick={() => openModal()}>
                新建项目
              </Button>
            </div>
            <div className='list'>
              {projectList.length ? (
                projectList.map((value, _index) => {
                  return (
                    <div className='item' key={value.id}>
                      <ProjectItem
                        name={value.projectname}
                        dec={value.description}
                        project_id={value.id}
                        iconPath={value.iconPath}
                        project_img={value.project_img}></ProjectItem>
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
