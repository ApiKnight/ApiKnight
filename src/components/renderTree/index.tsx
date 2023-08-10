import React from 'react'
import { useState, useEffect } from 'react'
import { Tree } from 'antd'
import { arrayToTree } from '@/utils/arrayToTree'
import type { TreeNode, ArrayItem, ArrayNode } from '@/types/arrayToTree'
import './index.less'
import { assign } from '@/store/modules/dirArraySlice.ts'
import { RootState } from '@/store/index.ts'
import { useSelector, useDispatch } from 'react-redux'
// 导入监控
import { createJsErrorMonitor } from '../../../sdk/createJsErrorMonitor'
import { createResourceErrorMonitor } from '../../../sdk/createResourceErrorMonitor'
import { createPromiseErrorMonitor } from '../../../sdk/createPromiseErrorMonitor'
import { createXhrMonitor } from '../../../sdk/createXhrMonitor'
import InterfaceBlock from '../InterfaceBlock'
import {treeToArray} from "@/utils/treeToArray";

interface Props {
  data: ArrayItem[]
}

interface MakeValue {
  value: ArrayItem[]
}

function startMonitor() {
  createJsErrorMonitor('renderTree').start()
  createResourceErrorMonitor('renderTree').start()
  createPromiseErrorMonitor('renderTree').start()
  createXhrMonitor('renderTree').start()
}

const renderTree: React.FC<Props> = ({ data }) => {
  function restoreData(data: ArrayItem[]): ArrayNode[] {
    const restoredData: ArrayNode[] = []

    for (const item of data) {
      const restoredItem: ArrayNode = {
        key: item.key,
        title: <InterfaceBlock data={item.title as any} />, // 将之前提取出的数据重新放入组件中
        type: item.type,
        pid: item.pid,
      }

      restoredData.push(restoredItem)
    }

    return restoredData
  }

  //
  const [makeValue, setMakeValue] = useState<MakeValue>({ value: data })
  const dispatch = useDispatch()
  const dirArray = useSelector((state: RootState) => state.dirArray.value)

  useEffect(() => {
    dispatch(assign(data))
  }, [])

  useEffect(() => {
    setMakeValue({ value: dirArray })
    console.log(dirArray)
  }, [dirArray])
  const renderData = restoreData(makeValue.value)
  // 数组转树形结构
  const tree: TreeNode[] = arrayToTree(renderData)
  const { DirectoryTree } = Tree
  startMonitor()
function treeToArray(tree: ArrayNode[]) {
    if (tree.length === 0) {
      return []
    }

    const result: ArrayNode[] = []

    function traverse(node: ArrayNode, pid: string | null) {
      const newNode: ArrayNode = {
        ...node,
        pid,
      }

      result.push(newNode)

      if (node.children) {
        node.children.forEach((child) => {
          traverse(child, node.key)
        })
      }
    }

    tree.forEach((node) => {
      traverse(node, null)
    })

    return result
  }
  function Drop(info:any): void {
    console.log("info:")
    console.log(info.dragNode)
    console.log(tree)
    let temp = treeToArray(tree);
    console.log(temp)
    for (let i = 0;i < temp.length;i++) {
      console.log(temp[i]);
      if (temp[i].key == info.dragNode.key) {
        console.log("改前:"+temp[i].pid);
        temp[i].pid = info.node.key
        console.log("改后:"+temp[i].pid);
      }
    }
    console.log(temp)
    //dispatch(assign(temp));
  }
  console.log(tree)
  return (
    <Tree
      treeData={tree}
      defaultExpandAll
      // onSelect={onSelect}
      // onRightClick={onRightClick}
      style={{ width: '270px' }}
      draggable
      blockNode
      className='renderTree'
      onDrop={Drop}
    ></Tree>
  )
}

export default renderTree
