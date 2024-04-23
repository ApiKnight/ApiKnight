import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { createFetchTemplate } from '@/template/fetchTemplate'
import { createAxiosTemplate } from '@/template/axiosTemplate'
import { createJQueryTemplate } from '@/template/jqueryTemplate'
import { createXHRTemplate } from '@/template/xhrTemplate'
import { Menu } from 'antd'
import CodeEditor from '../CodeEditor'
import { itemsJsCode } from './constant'
import { useAppSelector } from '@/store'
import { ArrayItemType } from '@/types/arrayToTree'

const JSCodeContent: React.FC = () => {
  const [current, setCurrent] = useState('1')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  const { baseInfo } = useAppSelector((state) => ({
    baseInfo: state.document.apiData.apiInfo.base,
  }))
  console.log(baseInfo)
  return (
    <div className='codeTemplate-content'>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={itemsJsCode}
      />
      <div className='codeTemplate-content__codeBlock'>
        {current === '1' ? (
          <CodeEditor
            defaultValue={createFetchTemplate(
              `http://127.0.0.1/${baseInfo.path}`,
              baseInfo.method as ArrayItemType,
              "'User-Agent', 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'",
              'follow',
            )}
            lang='javascript'
            height='360px'
            width='435px'
          />
        ) : current === '2' ? (
          <CodeEditor
            defaultValue={createAxiosTemplate(
              `http://127.0.0.1/${baseInfo.path}`,
              baseInfo.method as ArrayItemType,
              "'User-Agent': 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'",
              'follow',
            )}
            lang='javascript'
            height='360px'
            width='435px'
          />
        ) : current === '3' ? (
          <CodeEditor
            defaultValue={createJQueryTemplate(
              `http://127.0.0.1/${baseInfo.path}`,
              baseInfo.method as ArrayItemType,
              "'User-Agent': 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'",
              'follow',
            )}
            lang='javascript'
            height='360px'
            width='435px'
          />
        ) : current === '4' ? (
          <CodeEditor
            defaultValue={createFetchTemplate(
              `http://127.0.0.1/${baseInfo.path}`,
              baseInfo.method as ArrayItemType,
              "'User-Agent', 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'",
              'follow',
            )}
            lang='javascript'
            height='360px'
            width='435px'
          />
        ) : (
          <CodeEditor
            defaultValue={createXHRTemplate(
              `http://127.0.0.1/${baseInfo.path}`,
              baseInfo.method as ArrayItemType,
              "'User-Agent': 'Apifox/1.0.0 (https://lyyfsq.club/ApiKnight)'",
              'follow',
            )}
          />
        )}
      </div>
    </div>
  )
}

export default JSCodeContent
