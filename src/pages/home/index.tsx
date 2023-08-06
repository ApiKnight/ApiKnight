import React, { useState, useEffect } from 'react'
import './index.less'
import { Counter } from '../../components/Counter.tsx'
import ProjectItem from '@/components/ProjectItem'
import HearNavc from '@/components/HeaderNav'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import HeaderNav from '@/components/HeaderNav'

const { Header, Content, Footer } = Layout

const Home: React.FunctionComponent = () => {
  let [projectList, setProjectList] = useState<ProjectItemType[]>([])
  useEffect(() => {
    setProjectList([
      {
        id: 'p1',
        name: '项目1',
        iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
      },
      {
        id: 'p2',
        name: '项目2',
        iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
      },
      {
        id: 'p3',
        name: '项目4',
        iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
      },
      {
        id: 'p5',
        name: '项目5',
        iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
      },
      {
        id: 'p6',
        name: '项目6',
        iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
      },
      {
        id: 'p7',
        name: '项目8',
        iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
      },
      {
        id: 'p8',
        name: '项目8',
        iconPath: 'https://cdn.apifox.cn/app/project-icon/builtin/14.jpg'
      }
    ])
  }, [])
  return (
    <>
      <Layout className="layout">
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            height: '80px'
          }}
        >
          <div className="Header-title">
            <i>ApiKnight</i>
          </div>
          <HeaderNav />
        </Header>
        <Content style={{ padding: '50px 50px' }}>
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
    </>
  )
}

export default Home
