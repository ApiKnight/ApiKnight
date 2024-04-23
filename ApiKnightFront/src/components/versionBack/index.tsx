import React, { useEffect, useState, useRef } from 'react'
import { Timeline, TimelineItemProps } from 'antd'
import './index.less'
import { getVersionInfo } from '@/api/versionBack/queryVersion'
import { VersionInfo } from '@/types/versionInfo'
import { backHistory } from '@/api/versionBack/backHistory'

// eslint-disable-next-line react-refresh/only-export-components
const VersionBack: React.FC<{ apis_id: string }> = (props) => {
  const ItemsRef = useRef<VersionInfo[]>([])
  const [renderItem, setRenderItem] = useState<TimelineItemProps[]>([])

  useEffect(() => {
    getVersionInfo(props.apis_id).then((returnData) => {
      ItemsRef.current = returnData
      const reactTemp: TimelineItemProps[] = []
      ItemsRef.current.map((it) => {
        reactTemp.push({
          children: (
            <div
              className='versionNotes'
              onClick={async () => {
                await backHistory(it.id)
                window.location.reload()
              }}>
              {it.notes}
            </div>
          ),
        })
      })
      setRenderItem(reactTemp)
    })
  }, [props.apis_id])

  return (
    <div className='versionBack'>
      <Timeline items={renderItem} />
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(VersionBack)
