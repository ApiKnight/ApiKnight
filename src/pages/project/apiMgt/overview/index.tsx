import React from 'react'
import './index.less'
import { useLocation } from 'react-router-dom'
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const Overview: React.FunctionComponent = () => {
  const state= useLocation().state
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '项目名称',
      children: 'ApiKnight',
    },
    {
      key: '2',
      label: '项目描述',
      children: '这是一个好项目',
      span: '2'
    },
    {
      key: '3',
      label: '创建时间',
      children: '2019-04-24 18:00:00',
      span: '3',
    },
    {
      key: '4',
      label: 'Api数量',
      children: '4',
    },
    {
      key: '5',
      label: '用例数量',
      children: '6',
    },
    
    {
      key: '6',
      label: '成员数量',
      children: '8',
    },
    {
      key: '7',
      lebel: '添加接口/文档',
      children: <Badge status="processing" text="Running" />,
      span: '3'
    }
  ];
  return (
      <div className='project-overview'>
        <div className="header">
          项目概览
        </div>
        <div className="content">
        <Descriptions title="User Info" bordered items={items} />;
        </div>
        </div>
  )
}

export default Overview