import React, { useEffect } from 'react'
import Tab from '@/components/Tab'
import './index.less'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store'
import {
  changeCurrentKeyAction,
  removeTabAction,
} from '@/store/modules/tabSlice'
import { setValue } from '@/store/modules/rightSlice'

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
  }, [currentKey])

  useEffect(() => {
    if (tabs.length === 0) {
      dispatch(setValue('blank'))
    }
  }, [tabs])
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
    dispatch(changeCurrentKeyAction(tabs[index].key))
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
    </div>
  )
}

export default React.memo(Tabs)
