import React, { useState } from 'react'
import { Menu } from 'antd'
import { MenuProps } from 'antd'
import Document from '@/components/Document'

const RightMenu: React.FunctionComponent<{ data: string }> = (props) => {
  const { data } = props
  const items: MenuProps['items'] = [
    {
      label: '文档',
      key: '1',
    },
    {
      label: '修改文档',
      key: '2',
    },
    {
      label: '运行',
      key: '3',
    },
    {
      label: 'Mock',
      key: '4',
    },
  ]
  const [current, setCurrent] = useState('1')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      />
      ;
      {
        //  这里做条件渲染，文档，运行，mock等做成条件渲染，比如if e等于多少的时候渲染文档，等于多少的时候渲染运行
        current == 1 ? (
          <div>
            <Document data={data} />
          </div>
        ) : current == 2 ? (
          <div>修改文档组件,同时父组件传入的id为{data}</div>
        ) : current == 3 ? (
          <div>运行组件,同时父组件传入的id为{data}</div>
        ) : (
          <div>Mock组件,同时父组件传入的id为{data}</div>
        )
      }
    </div>
  )
}

export default RightMenu
