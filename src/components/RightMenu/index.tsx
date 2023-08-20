import React, { useState } from 'react'
import { Menu } from 'antd'
import { MenuProps } from 'antd'

import './index.less'
// import Document from '@/components/Document'
import Mock from '@/pages/project/apiMgt/certainApi/mock'
import Document from '@/pages/project/apiMgt/certainApi/document'

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
    <div className='doc-area'>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      />
      <div className='panel'>
        {
          //  这里做条件渲染，文档，运行，mock等做成条件渲染，比如if e等于多少的时候渲染文档，等于多少的时候渲染运行
          current === '1' ? (
            <Document data={data} />
          ) : current === '2' ? (
            // <div>修改文档组件,同时父组件传入的id为{data}</div>
            <Document data={data} />
          ) : current === '3' ? (
            <Mock data={data} mode='run' />
          ) : (
            // <div>Mock组件,同时父组件传入的id为{data}</div>
            <Mock
              data={data}
              mode='mock'
              mockPrefix='http://www.apiknight.com'
            />
          )
        }
      </div>
    </div>
  )
}

export default RightMenu
