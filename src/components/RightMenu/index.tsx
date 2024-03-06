import React, { useState } from 'react'
import { Menu } from 'antd'
import { MenuProps } from 'antd'
import './index.less'
import { items } from './constant.ts'
import { Props } from './type'
import RightMenuContent from './RightMenuContent/index.tsx'

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
      <RightMenuContent current={current} data={data} project_id={project_id} />
    </div>
  )
}

export default RightMenu
