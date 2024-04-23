import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import { Skeleton, Tree, TreeProps } from 'antd'
import { arrayToTree } from '@/utils/arrayToTree'
import type {
  TreeNode,
  ArrayItem,
  ArrayNode,
  ArrayItemType,
} from '@/types/arrayToTree'
import './index.less'
import { useLocation } from 'react-router-dom'
import { RootState } from '@/store/index.ts'
import { useSelector, useDispatch } from 'react-redux'
import InterfaceBlock from '../InterfaceBlock'
import { FlatItem } from '@/types/mergeFlatArrays'
import { mergeFlatArrays } from '@/utils/mergeFlatArrays'
import request from '@/api/request'
import { increment } from '@/store/modules/watchDir'
import { MakeValue } from './type'
import { getProjectInfoById } from '@/api/project'

const RenderTree: React.FC = () => {
  const [showLoading, setShowLoading] = useState<boolean>(false)
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
  const reqFun = useCallback(async () => {
    setShowLoading(true)
    const resp = await getProjectInfoById(projectId)
    if (resp.code == 200) {
      setData(
        mergeFlatArrays(resp.data.folder_list, resp.data.api_list, projectId),
      )
      setMakeValue({
        value: mergeFlatArrays(
          resp.data.folder_list,
          resp.data.api_list,
          projectId,
        ),
      })
      console.log('------------------====-----------------------')
      console.log(resp.data.folder_list)
      console.log(resp.data.api_list)
      console.log(
        mergeFlatArrays(resp.data.folder_list, resp.data.api_list, projectId),
      )
      setShowLoading(false)
    }
  }, [projectId])
  const watchDir = useSelector((state: RootState) => state.watchDir.value)
  useEffect(() => {
    reqFun()
  }, [reqFun, watchDir])
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
  const onDrop: TreeProps['onDrop'] = useCallback(
    (info) => {
      if ((info.node as unknown as { type: ArrayItemType }).type === 'FILE') {
        console.log(info)
        const url =
          (info.dragNode as unknown as { type: ArrayItemType }).type === 'FILE'
            ? '/v1/folder/update'
            : '/v1/apis/update'
        const urlData =
          (info.dragNode as unknown as { type: ArrayItemType }).type === 'FILE'
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
    },
    [dispatch],
  )
  const renderData = restoreData(makeValue.value)
  // 数组转树形结构
  const tree: TreeNode[] = arrayToTree(renderData)
  console.log('tree and renderData:')
  console.log(renderData)
  console.log(tree)
  return (
    <div className='tree-part'>
      {(() => {
        if (showLoading) {
          return (
            <div className='loading'>
              <Skeleton style={{ height: '100%' }} />
            </div>
          )
        } else {
          return (
            <Tree
              treeData={tree}
              defaultExpandAll
              draggable
              blockNode
              onDrop={onDrop}
              style={{ width: '250px' }}
              className='renderTree'></Tree>
          )
        }
      })()}
    </div>
  )
}

export default RenderTree
