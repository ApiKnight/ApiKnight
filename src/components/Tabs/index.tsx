import React, { useEffect, useState } from 'react'
import { TabsSetItem } from '@/types/tabs'
import Tab from '@/components/Tab'
import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useAppSelector } from '@/store'
import { useLocation } from 'react-router-dom'
import {
  addData,
  assign,
  changeCurrentKeyAction,
  removeTabAction,
} from '@/store/modules/tabSlice'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ArrayItemType } from '@/types/arrayToTree'
import { setValue } from '@/store/modules/rightSlice'

const Tabs: React.FunctionComponent = () => {
  // const [tabList, setTabList] = useState<Array<TabsSetItem>>([
  //   {
  //     key: '1111111',
  //     title: 'getList',
  //     type: 'GET',
  //   },
  // ])
  const dispatch = useDispatch()
  const { tabs, currentKey } = useAppSelector((state) => ({
    tabs: state.tabSlice.data,
    currentKey: state.tabSlice.currentKey,
  }))

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.key === currentKey)
    if (currentTab.type === 'gl') {
      dispatch(setValue('gl'))
    } else {
      dispatch(setValue(currentTab.key))
    }
  }, [currentKey])

  useEffect(() => {
    if (tabs.length === 0) {
      dispatch(setValue('blank'))
    }
  }, [tabs])

  // const state = useLocation().state
  // useEffect(()=>{}, [state])

  // const projectId = state.project_id
  // useEffect(() => {
  //   const d: any = [
  //     {
  //       key: projectId,
  //       title: '项目概览',
  //       type: 'gl',
  //     },
  //   ]
  //   dispatch(assign(d))
  //   dispatch(setValue('gl'))
  // }, [])

  // useEffect(() => {
  //   setTabList(Tabs)
  // }, [Tabs])

  // 处理标签页删除事件
  function handleTabClose(index: number) {
    let newIndex = 0
    if (tabs.length > 1) {
      newIndex = index === 0 ? 1 : index - 1
    }
    dispatch(changeCurrentKeyAction(tabs[newIndex].key))
    dispatch(removeTabAction(index))
  }

  // 处理页面被选中事件
  function handleTabSelected(index: number) {
    console.log('handleTabSelected', index)

    dispatch(changeCurrentKeyAction(tabs[index].key))
  }

  function openTab(): void {
    // const d: any = {
    //   key: '0',
    //   title: '新建页面',
    //   type: '',
    // }
    // dispatch(addData(d))
    console.log('新建页面事件')
  }
  return (
    <div className='tabs'>
      {tabs.map((item, index) => {
        return (
          <Tab
            data={item}
            key={item.key}
            active={item.key === currentKey}
            onRemoveTab={handleTabClose}
            onSelected={handleTabSelected}
            index={index}
          />
        )
      })}
      {/* <div className='tabs-btn' onClick={openTab}>
        <Button type='text' icon={<PlusOutlined />} />
      </div> */}
    </div>
  )
}

export default Tabs
