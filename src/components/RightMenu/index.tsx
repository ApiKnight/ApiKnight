import React, { useState } from 'react'
import { Menu } from 'antd'
import { MenuProps } from 'antd'
import './index.less'
import Mock from '@/pages/project/apiMgt/certainApi/mock'
import Document from '@/pages/project/apiMgt/certainApi/document'
import Introduction from '@/pages/project/apiMgt/certainApi/introduction'
import { items } from './constant.ts'
import { Props } from './type'

const RightMenu: React.FC<Props> = (props) => {
  const { data, project_id } = props
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
            <Introduction data={data} />
          ) : current === '2' ? (
            // <div>修改文档组件,同时父组件传入的id为{data}</div>
            <Document data={data} />
          ) : current === '3' ? (
            <Mock mode='run' project_id={project_id} />
          ) : (
            // <div>Mock组件,同时父组件传入的id为{data}</div>
            <Mock mode='mock' project_id={project_id} />
          )
        }
      </div>
    </div>
  )
}

export default RightMenu
