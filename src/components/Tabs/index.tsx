import React, { useEffect, useState } from 'react'
import { TabsSetItem } from '@/types/tabs'
import Tab from '@/components/Tab'
import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { addData, assign } from '@/store/modules/tabSlice'
import { Button } from 'antd'

const Tabs: React.FunctionComponent = () => {
  const [tabList, setTabList] = useState<Array<TabsSetItem>>([
    {
      key: '1111111',
      title: 'getList',
      type: 'GET',
    },
  ])
  const dispatch = useDispatch()
  const Tabs = useSelector((state: RootState) => state.tabSlice.data)
  useEffect(() => {
    dispatch(
      assign([
        {
          key: '0',
          title: '新建页面',
          type: '',
        },
      ]),
    )
  }, [])
  useEffect(() => {
    setTabList(Tabs)
  }, [Tabs])
  function openTab(): void {
    dispatch(
      addData({
        key: '0',
        title: '新建页面',
        type: '',
      }),
    )
  }
  return (
    <div className='tabs'>
      {tabList.map((item) => {
        return <Tab data={item} key={item.key} />
      })}
      <div className='tabs-btn'>
        <Button onClick={openTab} size='small'>
          +
        </Button>
      </div>
    </div>
  )
}

export default Tabs
