import React, { useEffect, useState } from 'react'
import './index.less'
import { useLocation } from 'react-router-dom'
import { Badge, Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import getProjectBase from '@/api/getProjectBase'
import testApi from '@/api/testApi'
const Overview: React.FunctionComponent = () => {
  const state = useLocation().state
  const [projectBase, setProjectBase] = useState({})
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '项目名称',
      children:
        projectBase.projectname !== undefined ? projectBase.projectname : '',
      span: '1',
    },
    {
      key: '2',
      label: '项目描述',
      children:
        projectBase.description !== undefined ? projectBase.description : '',
      span: '1',
    },
    {
      key: '3',
      label: '创建时间',
      children:
        projectBase.create_time !== undefined ? projectBase.create_time : '',
      span: '1',
    },
    {
      key: '4',
      label: 'Api数量',
      children:
        projectBase.apis_count !== undefined ? projectBase.apis_count : '',
      span: '1',
    },
    // {
    //   key: '5',
    //   label: '用例数量',
    //   children: '6',
    // },

    {
      key: '5',
      label: '成员数量',
      children: projectBase.members_count ? projectBase.members_count : '',
      span: '1',
    },
    {
      key: '6',
      lebel: 'Running',
      children: <Badge status='processing' text='Running' />,
      span: '1',
    },
  ]
  useEffect(()=>{
    // testApi()
    getProjectBase(state.project_id).then(res=>{
      res.data.code === 200
      ?
      setProjectBase(res.data.data)
      :
      ''
    })
  }, [])
  return (
    <div className='project-overview'>
      <div className='content'>
        <Descriptions title='项目概览' bordered items={items} />
      </div>
    </div>
  )
}

export default Overview
