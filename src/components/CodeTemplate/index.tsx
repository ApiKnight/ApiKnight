import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import { CloseOutlined } from '@ant-design/icons'
import Overlay from '@/components/overlay'
import { useDispatch } from 'react-redux'
import { setValue } from '@/store/modules/templateSlice'
import JSCodeContent from './JSCodeContent'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import JavaCodeContent from './JavaCodeContent'
import GoCodeContent from './GoCodeContent'

const CodeTemplate: React.FC = () => {
  const dispatch = useDispatch()
  function closeThisPage(e: any): void {
    dispatch(setValue(false))
    e.stopPropagation()
  }

  const items: MenuProps['items'] = [
    {
      label: 'JavaScirpt',
      key: '1',
    },
    {
      label: 'Java',
      key: '2',
    },
    {
      label: 'Go',
      key: '3',
    },
  ]
  const [current, setCurrent] = useState('1')

  const onClick: MenuProps['onClick'] = (e: any) => {
    setCurrent(e.key)
  }

  return ReactDOM.createPortal(
    <div className='codeTemplate'>
      <Overlay data={10000} />
      <div className='codeTemplate-title'>
        <h1>生成代码</h1>
        <div className='codeTemplate-title__closed' onClick={closeThisPage}>
          <CloseOutlined style={{ fontSize: '36px' }} />
        </div>
      </div>
      <div className='codeTemplate-body'>
        <Menu
          onClick={onClick}
          style={{ width: 120 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
          items={items}
        />
        {
          //  这里做条件渲染，文档，运行，mock等做成条件渲染，比如if e等于多少的时候渲染文档，等于多少的时候渲染运行
          current === '1' ? (
            <JSCodeContent />
          ) : current === '2' ? (
            <JavaCodeContent />
          ) : (
            <GoCodeContent />
          )
        }
      </div>
    </div>,
    document.body,
  )
}

export default CodeTemplate
