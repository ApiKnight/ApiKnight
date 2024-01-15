import React, { useEffect, useState } from 'react'
import './index.less'
import { useLocation } from 'react-router-dom'
import { Badge, Descriptions, Button, Modal, Input, App } from 'antd'
import type { DescriptionsProps } from 'antd'
import getProjectBase from '@/api/getProjectBase'
import testApi from '@/api/testApi'

import './index.less'
import { set } from 'immer/dist/internal.js'
import { requestByServerProxy } from '@/api/service'
import { parseAPIInfo, parseSwaggerDoc } from '@/utils/api/api'
import { getUserId } from '@/utils/storage/storage'
import { IAPIInfo } from '@/types/api'
import { useAppDispatch, useAppSelector } from '@/store'
import { createFolder, getFolderName } from '@/api/folder'
import {
  createApi,
  createFullApi,
  createMock,
  shareApi,
  updateApi,
} from '@/api'
import { getProjectInfoById } from '@/api/project'
import { fetchProjectInfoAction } from '@/store/modules/project'
import { getRangeRandom } from '@/utils/math'
import { IRawApiInfo } from '@/api/project/type'

const Overview: React.FunctionComponent = () => {
  const { message } = App.useApp()
  const dispatch = useAppDispatch()
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

  const { apiList } = useAppSelector((state) => ({
    apiList: state.project.projectInfo.api_list,
  }))
  useEffect(() => {
    // testApi()
    getProjectBase(state.project_id).then((res: any) => {
      res.data.code === 200 ? setProjectBase(res.data.data) : ''
    })
  }, [])

  const { folderList, projectId } = useAppSelector((state) => ({
    folderList: state.project.projectInfo.folder_list,
    projectId: state.project.projectInfo.id,
  }))

  // 确认导入事件
  async function handleConfirmImport() {
    setOnImporting(true)
    try {
      const { data } = await requestByServerProxy({
        url: importUrl,
        method: 'GET',
      })
      if (data?.type === 'apiknight') {
        // apiknight文档
        await startImportApiKnightDoc(data.data, getUserId())
      } else {
        // swagger2.0文档
        const apiInfoMap = parseSwaggerDoc(data, getUserId())
        await startImport(apiInfoMap)
      }

      message.success('导入成功')
    } catch (err) {
      message.error('导入失败，请检查URL是否正确\n' + err)
      console.log(err)

      console.trace(err)
    } finally {
      setOnImporting(false)
      setOnImportVisible(false)
      setTimeout(() => {
        // 暂时用刷新页面替代
        window.location.reload()
      }, 1000)
    }
  }

  /**
   *
   * @param apiInfoListStr 来自apknight分享的接口信息中的api列表
   */
  async function startImportApiKnightDoc(
    apiInfoListStr: string,
    userId: string,
  ) {
    const createdFolderList: string[] = []
    // 将string转成对象
    const apiInfoList: IAPIInfo[] = JSON.parse(apiInfoListStr)
    // 第一步遍历所有的目录，将不存在的目录创建
    const rootFolderId = folderList.find((item) => item.name === '根目录')?.id
    for (let i = 0; i < apiInfoList.length; i++) {
      const apiInfoItem = apiInfoList[i]
      // 注入信息
      apiInfoItem.meta_info.owner_id = userId
      apiInfoItem.meta_info.notes = '来自分享的ApiKnight接口'
      if (!apiInfoItem?.apiInfo?.response?.body) {
        apiInfoItem.apiInfo.response.body = '{}'
      }
      if (!apiInfoItem?.meta_info?.name) {
        apiInfoItem.meta_info.name = '未命名接口'
      }

      // 查询目录名称
      let folderName = '根目录'
      if (apiInfoItem?.meta_info?.folder_id) {
        folderName = await getFolderName(apiInfoItem.meta_info.folder_id)
        // 将目录名暂时赋予到folder_id中
        apiInfoList[i].meta_info.folder_id = folderName
      } else {
        apiInfoList[i].meta_info.folder_id = '根目录'
      }
      // 如果目录名存在则直接添加
      const folderIndexInProj = folderList.findIndex(
        (item) => item.name === folderName,
      )

      // debugger
      if (folderIndexInProj === -1) {
        // 并且此目录并没有被创建过
        if (createdFolderList.indexOf(folderName) === -1) {
          // 目录不存在则创建目录
          await createFolder(projectId, rootFolderId, folderName)
          createdFolderList.push(folderName)
        }
      }
    }

    // console.log({ apiInfoList })

    // return
    // 第二步 获取最新项目信息
    const { folder_list: newestFolderList } =
      await getProjectInfoById(projectId)

    console.log({ newestFolderList })

    // return

    // 第三步遍历所有的api，所有api创建
    for (let apiInfoItem of apiInfoList) {
      // 如果目录名存在则直接添加
      const folderIndexInProj = newestFolderList.findIndex(
        (item) => item.name === apiInfoItem.meta_info.folder_id,
      )
      if (folderIndexInProj !== -1) {
        // 创建接口
        const folderId = newestFolderList[folderIndexInProj].id
        // 创建接口
        await createFullApi({
          projectId,
          folderId,
          name: apiInfoItem.meta_info.name,
          description: apiInfoItem.meta_info.description || '无描述',
          requestData: apiInfoItem,
          responseDataStr: apiInfoItem.apiInfo.response.body,
        })
      }
    }

    // 刷新本地的项目信息
    dispatch(fetchProjectInfoAction(projectId))
  }

  /**
   * 导入swagger文档
   * @param apiInfoMap 来自swagger转换而来的api信息
   */
  async function startImport(apiInfoMap: Map<string, IAPIInfo[]>) {
    const createdFolderList: string[] = []
    // 第一步遍历所有的目录，将不存在的目录创建
    const rootFolderId = folderList.find((item) => item.name === '根目录')?.id
    for (let [folderName] of apiInfoMap) {
      // 如果目录名存在则直接添加
      const folderIndexInProj = folderList.findIndex(
        (item) => item.name === folderName,
      )
      if (folderIndexInProj === -1) {
        // 并且此目录并没有被创建过
        if (createdFolderList.indexOf(folderName) === -1) {
          // 目录不存在则创建目录
          await createFolder(projectId, rootFolderId, folderName)
          createdFolderList.push(folderName)
        }
      }
    }
    // 第二步 获取最新项目信息
    const { folder_list: newestFolderList } =
      await getProjectInfoById(projectId)

    // 第三步遍历所有的api，所有api创建
    for (let [folderName, apiList] of apiInfoMap) {
      // 如果目录名存在则直接添加
      const folderIndexInProj = newestFolderList.findIndex(
        (item) => item.name === folderName,
      )
      if (folderIndexInProj !== -1) {
        // 创建接口
        for (let apiItem of apiList) {
          const folderId = newestFolderList[folderIndexInProj].id
          // 创建接口
          await createFullApi({
            projectId,
            folderId,
            name: apiItem.meta_info.name,
            description: apiItem.meta_info.description || '无描述',
            requestData: apiItem,
            responseDataStr: apiItem.apiInfo.response.body,
          })
        }
      }
    }

    // 刷新本地的项目信息
    dispatch(fetchProjectInfoAction(projectId))
  }

  // 开始分享,准备分享链接
  async function startShare() {
    setShareUrl('正在生成分享链接...')
    setOnShareVisible(true)
    const shareURL = await shareApi(apiList, projectId)
    setShareUrl(shareURL)
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
        onCancel={() => setOnImportVisible(false)}
      >
        <Input
          style={{ marginTop: '15px' }}
          placeholder='OpenAPI（Swagger2.0）在线URL获取ApiKnight的分享链接'
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
        okText='复制接口链接'
      >
        <Input
          style={{ marginTop: '15px' }}
          placeholder='分享链接'
          value={shareUrl}
        />
      </Modal>
    </>
  )
}

export default Overview
