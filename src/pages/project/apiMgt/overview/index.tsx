import React, { useEffect, useState } from 'react'
import './index.less'
import { useLocation } from 'react-router-dom'
import { Badge, Descriptions, Button, Modal, Input, App } from 'antd'
import type { DescriptionsProps } from 'antd'
import getProjectBase from '@/api/getProjectBase'
import testApi from '@/api/testApi'

import './index.less'
import { set } from 'immer/dist/internal.js'

const Overview: React.FunctionComponent = () => {
  const { message } = App.useApp()
  // 导入相关
  const [importUrl, setImportUrl] = useState<string>('')
  const [onImportVisible, setOnImportVisible] = useState<boolean>(false)
  const [onImporting, setOnImporting] = useState<boolean>(false)
  // 分享（导出相关）
  const [shareUrl, setShareUrl] = useState<string>('')
  const [onShareVisible, setOnShareVisible] = useState<boolean>(false)
  const [onShareing, setOnShareing] = useState<boolean>(false)

  const state = useLocation().state
  const [projectBase, setProjectBase] = useState<any>({})
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '项目名称',
      children:
        projectBase.projectname !== undefined ? projectBase.projectname : '',
      span: 1,
    },
    {
      key: '2',
      label: '项目描述',
      children:
        projectBase.description !== undefined ? projectBase.description : '',
      span: 1,
    },
    {
      key: '3',
      label: '创建时间',
      children:
        projectBase.create_time !== undefined ? projectBase.create_time : '',
      span: 1,
    },
    {
      key: '4',
      label: 'Api数量',
      children:
        projectBase.apis_count !== undefined ? projectBase.apis_count : '',
      span: 1,
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
      span: 1,
    },
    {
      key: '6',
      label: '项目状态',
      children: <Badge status='processing' text='Running' />,
      span: 1,
    },
  ]
  useEffect(() => {
    // testApi()
    getProjectBase(state.project_id).then((res: any) => {
      res.data.code === 200 ? setProjectBase(res.data.data) : ''
    })
  }, [])

  // 确认导入事件
  async function handleConfirmImport() {
    console.log(importUrl)
    setOnImporting(true)
    // 测试
    setTimeout(() => {
      setOnImporting(false)
      setOnImportVisible(false)
      message.success('导入成功')
    }, 1000)
  }

  // 开始分享,准备分享链接
  function startShare() {
    setShareUrl('http://localhost:3000/project/1')
    setOnShareVisible(true)
  }

  // 确认分享事件
  async function handleConfirmShare() {
    //  将链接写入剪切板
    navigator.clipboard.writeText(shareUrl)
    message.success('复制成功')
    setOnShareVisible(false)
  }

  return (
    <>
      <div className='project-overview'>
        <div className='content-item'>
          <div className='title'>基本信息</div>
          <Descriptions bordered items={items} />
        </div>
        <div className='content-item'>
          <div className='title'>分享接口</div>
          <div className='content-detail'>
            <div className='desc'>
              获取项目内接口链接，方便发送给外部团队，外部团队可以使用链接导入接口信息
            </div>
            <div className='opts'>
              <Button type='dashed' onClick={startShare}>
                创建分享
              </Button>
            </div>
          </div>
        </div>

        <div className='content-item'>
          <div className='title'>自动导入</div>
          <div className='content-detail'>
            <div className='desc'>
              自动将OpenAPI（Swagger）格式的在线URL接口或者ApkKnight分享的URL接口输入，并导入ApiKnight项目
            </div>
            <div className='opts'>
              <Button type='dashed' onClick={(e) => setOnImportVisible(true)}>
                开始导入
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title='开始导入'
        open={onImportVisible}
        confirmLoading={onImporting}
        onOk={handleConfirmImport}
        onCancel={() => setOnImportVisible(false)}>
        <Input
          style={{ marginTop: '15px' }}
          placeholder='OpenAPI（Swagger）在线URL'
          value={importUrl}
          onChange={(e) => setImportUrl(e.target.value)}
        />
      </Modal>

      <Modal
        title='分享接口'
        open={onShareVisible}
        confirmLoading={onShareing}
        onOk={handleConfirmShare}
        onCancel={() => setOnShareVisible(false)}
        okText='复制接口链接'>
        <Input
          style={{ marginTop: '15px' }}
          placeholder='OpenAPI（Swagger）在线URL'
          value={shareUrl}
        />
      </Modal>
    </>
  )
}

export default Overview
