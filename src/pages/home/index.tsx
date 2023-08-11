import React, { useState, useEffect } from 'react'
import './index.less'
import ProjectItem from '@/components/ProjectItem'
import { Layout, Button } from 'antd'
import HeaderNav from '@/components/HeaderNav'
import { PlusOutlined } from '@ant-design/icons'
import CreateProject from '@/components/CreateProject'
import request from '@/api/request'
import getUserInfo from '@/api/getUserInfo'
const { Header, Content, Footer } = Layout

const Home: React.FunctionComponent = () => {
  const [projectList, setProjectList] = useState<ProjectItemType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const updateProjectList = () => {
    request.get('v1/project/list').then((res) => {
      let { data } = res.data
      let list = []
      data.forEach((value) => {
        list.push({
          name: value.projectname,
          dec: value.description,
          project_id: value.id,
          iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg',
        })
      })
      setProjectList(list)
    })
  }

  useEffect(() => {
    //有token，先登录再拉取项目列表
    if (localStorage.getItem('token') && localStorage.getItem('user_id')) {
      updateProjectList()
      getUserInfo(localStorage.getItem('user_id')).then((res) => {
        let data = res.data.data
        setUserInfo(data)
      })
    }
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
          <HeaderNav userInfo={userInfo} />
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
                <li className='projectListItem' key={value.project_id}>
                  <ProjectItem
                    name={value.name}
                    dec={value.dec}
                    project_id={value.project_id}
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
        updateProjectList={updateProjectList}
      />
    </>
  )
}

export default Home
