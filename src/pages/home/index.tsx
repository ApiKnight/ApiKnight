import React, { useState, useEffect } from 'react'
import './index.less'
import ProjectItem from '@/components/ProjectItem'
import { Layout,Button } from 'antd'
import HeaderNav from '@/components/HeaderNav'
import { PlusOutlined } from '@ant-design/icons';
import UpdateProject from '@/components/UpdateProject'
import request from '@/api/request'

const { Header, Content, Footer } = Layout

const Home: React.FunctionComponent = () => {
  const [projectList, setProjectList] = useState<ProjectItemType[]>([])
  const [isModalOpen,setIsModalOpen] = useState(false)
  const openModal=()=>{
    setIsModalOpen(true)
  }
  const closeModal=()=>{
    setIsModalOpen(false)
  }
  useEffect(() => {
    // setProjectList([
    //   {
    //     id: 'p1',
    //     name: '项目1',
    //     iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
    //   },
    //   {
    //     id: 'p2',
    //     name: '项目2',
    //     iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
    //   },
    //   {
    //     id: 'p3',
    //     name: '项目4',
    //     iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
    //   },
    //   {
    //     id: 'p5',
    //     name: '项目5',
    //     iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
    //   },
    //   {
    //     id: 'p6',
    //     name: '项目6',
    //     iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
    //   },
    //   {
    //     id: 'p7',
    //     name: '项目8',
    //     iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
    //   },
    //   {
    //     id: 'p8',
    //     name: '项目8',
    //     iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
    //   }
    // ])
    request.get('v1/invite/sending').then((res)=>{
      console.log('res',res);
    })
  }, [])
  return (
    <>
      <Layout className="layout">
        <Header
          style={{
            backgroundColor: '#ffffff',
            height: '80px'
          }}
        >
          <HeaderNav />
        </Header>
        <Content style={{ padding: '50px 50px',justifyContent:'center'}}>
        <div className="Content-title">
            <strong>我的项目</strong>
            <Button icon={<PlusOutlined />} style={{backgroundColor:'#9373ee',color:'#ffffff'}} onClick={()=>openModal()}>新建项目</Button>
          </div>
          <ul>
            {projectList.map((value, index) => {
              return (
                <li className="projectListItem" key={value.id}>
                  <ProjectItem
                    name={value.name}
                    id={value.id}
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
      
      <UpdateProject isModalOpen={isModalOpen} closeModal={closeModal}/>
    </>
  )
}

export default Home
