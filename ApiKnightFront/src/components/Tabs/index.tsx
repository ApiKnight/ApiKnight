import React, { useCallback, useEffect } from 'react'
import Tab from '@/components/Tab'
import './index.less'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store'
import {
  changeCurrentKeyAction,
  removeTabAction,
} from '@/store/modules/tabSlice'
import { setValue } from '@/store/modules/rightSlice'
import { TabsSetItem } from '@/types/tabs'

// eslint-disable-next-line react-refresh/only-export-components
const Tabs: React.FunctionComponent = () => {
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
  }, [currentKey, dispatch, tabs])

  useEffect(() => {
    if (tabs.length === 0) {
      dispatch(setValue('blank'))
    }
  }, [dispatch, tabs])
  // 处理标签页删除事件
  const handleTabClose = useCallback(
    (index: number) => {
      let newIndex = 0
      if (tabs.length > 1) {
        newIndex = index === 0 ? 1 : index - 1
      }
      dispatch(changeCurrentKeyAction(tabs[newIndex].key))
      dispatch(removeTabAction(index))
    },
    [dispatch, tabs],
  )
  // 处理页面被选中事件
  const handleTabSelected = useCallback(
    (index: number) => {
      dispatch(changeCurrentKeyAction(tabs[index].key))
    },
    [dispatch, tabs],
  )
  return (
    <div className='tabs'>
      {tabs.map((item, index) => {
        return (
          <Tab
            data={item as TabsSetItem}
            key={item.key}
            active={item.key === currentKey}
            onRemoveTab={handleTabClose}
            onSelected={handleTabSelected}
            index={index}
          />
        )
      })}
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Tabs)