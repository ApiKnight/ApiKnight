import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import { useDispatch } from 'react-redux'
import { setTemplateValue } from '@/store/modules/templateSlice'
import JSCodeContent from './JSCodeContent'
import type { MenuProps } from 'antd'
import { Menu, Modal } from 'antd'
import JavaCodeContent from './JavaCodeContent'
import GoCodeContent from './GoCodeContent'

const CodeTemplate: React.FC = () => {
  const dispatch = useDispatch()
  function closeThisPage(e: any): void {
    dispatch(setTemplateValue(false))
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
  return (
    <div className='codeTemplate'>
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
    </div>
  )
}

export default CodeTemplate
