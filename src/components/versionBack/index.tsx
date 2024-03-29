import React, { useEffect, useState } from 'react'
import { Timeline, TimelineItemProps } from 'antd'
import './index.less'
import { getVersionInfo } from '@/api/versionBack/queryVersion'
import { VersionInfo } from '@/types/versionInfo'
import { backHistory } from '@/api/versionBack/backHistory'

const VersionBack: React.FC<{ apis_id: string }> = (props) => {
  let Items: VersionInfo[]
  const [renderItem, setRenderItem] = useState<TimelineItemProps[]>([])
  useEffect(() => {
    getVersionInfo(props.apis_id).then((returnData) => {
      Items = returnData
      const reactTemp: TimelineItemProps[] = []
      Items.map((it) => {
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

export default React.memo(VersionBack)
