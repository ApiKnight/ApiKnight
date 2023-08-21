import React from 'react'
import { useState, useEffect } from 'react'
import { Spin, Tree } from 'antd'
import { arrayToTree } from '@/utils/arrayToTree'
import type { TreeNode, ArrayItem, ArrayNode } from '@/types/arrayToTree'
import './index.less'
import { useLocation } from 'react-router-dom'
import { RootState } from '@/store/index.ts'
import { useSelector, useDispatch } from 'react-redux'
// 导入监控
import { createJsErrorMonitor } from '../../../sdk/createJsErrorMonitor'
import { createResourceErrorMonitor } from '../../../sdk/createResourceErrorMonitor'
import { createPromiseErrorMonitor } from '../../../sdk/createPromiseErrorMonitor'
import { createXhrMonitor } from '../../../sdk/createXhrMonitor'
import InterfaceBlock from '../InterfaceBlock'
import { FlatItem } from '@/types/mergeFlatArrays'
import { mergeFlatArrays } from '@/utils/mergeFlatArrays'
import request from '@/api/request'
import { increment } from '@/store/modules/watchDir'

interface Props {
  data: ArrayItem[]
}

interface MakeValue {
  value: ArrayItem[]
}

const renderTree: React.FC = (props) => {
  function startMonitor() {
    createJsErrorMonitor('renderTree').start()
    createResourceErrorMonitor('renderTree').start()
    createPromiseErrorMonitor('renderTree').start()
    createXhrMonitor('renderTree').start()
  }
  const [showLoading, setShowLoading] = useState(false)
  const a1: FlatItem[] = [
    {
      id: '694948f6-7908-4388-8da7-c744b13f76b6',
      project_id: 1063,
      name: '根目录',
      parent_id: null,
    },
  ]
  const [data, setData] = useState(mergeFlatArrays(a1, [], 1063))
  const [makeValue, setMakeValue] = useState<MakeValue>({ value: data })
  const state = useLocation().state
  const projectId = state.project_id
  function reqFun() {
    setShowLoading(true)
    request
      .post('/v1/project/query', { projectid: projectId }, {})
      .then((resp) => {
        // 在这里处理返回的数据
        if (resp.data.code == 200) {
          setData(
            mergeFlatArrays(
              (resp.data as any).data.folder_list,
              (resp.data as any).data.api_list,
              projectId,
            ),
          )
          setMakeValue({
            value: mergeFlatArrays(
              (resp.data as any).data.folder_list,
              (resp.data as any).data.api_list,
              projectId,
            ),
          })
          setShowLoading(false)
        }
      })
  }
  const watchDir = useSelector((state: RootState) => state.watchDir.value)
  useEffect(() => {
    reqFun()
  }, [watchDir])
  function restoreData(d: ArrayItem[]): ArrayNode[] {
    const restoredData: ArrayNode[] = []

    for (const item of d) {
      const restoredItem: ArrayNode = {
        key: item.key,
        title: (
          <InterfaceBlock
            data={{
              title: item.title,
              key: item.key,
              pid: item.pid,
              type: item.type,
            }}
          />
        ), // 将之前提取出的数据重新放入组件中
        type: item.type,
        pid: item.pid,
      }

      restoredData.push(restoredItem)
    }

    return restoredData
  }
  const dispatch = useDispatch()
  const onDrop = (info) => {
    const url =
      info.dragNode.type === 'FILE' ? '/v1/folder/update' : '/v1/apis/update'
    const urlData =
      info.dragNode.type === 'FILE'
        ? { folder_id: info.dragNodesKeys[0], parent_id: info.node.key }
        : { apis_id: info.dragNodesKeys[0], folder_id: info.node.key }
    setShowLoading(true)
    request.post(url, urlData, {}).then((res) => {
      console.log(res)

      // 在这里处理返回的数据
      dispatch(increment())
      setShowLoading(true)
    })
  }
  const renderData = restoreData(makeValue.value)
  // 数组转树形结构
  const tree: TreeNode[] = arrayToTree(renderData)
  console.log('tree', tree)
  const { DirectoryTree } = Tree
  //startMonitor()
  return (
    <div>
      <Tree
        treeData={tree}
        defaultExpandAll
        draggable
        blockNode
        onDrop={onDrop}
        style={{ width: '270px' }}
        className='renderTree'
      ></Tree>
      {showLoading && (
        <Spin tip='Loading' size='large'>
          <div className='content' />
        </Spin>
      )}
    </div>
  )
}

export default renderTree
