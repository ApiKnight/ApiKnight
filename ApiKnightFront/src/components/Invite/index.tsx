import React from 'react'
import ReactDOM from 'react-dom'
import Email from '@/components/Invite/email'
import './index.less'
import Title from '@/components/Invite/title'
import { Tabs } from 'antd'
import Link from '@/components/Invite/link'
import { useStateFlag } from '@/region/stateFlag'

// eslint-disable-next-line react-refresh/only-export-components
const Invite: React.FunctionComponent<{ project_id: number | string }> = (
  props,
) => {
  const flag = useStateFlag()
  if (flag == true) {
    return ReactDOM.createPortal(
      <div className='invite-modal'>
        <Title projectid={props.project_id} />
        <Tabs
          defaultActiveKey='1'
          centered
          items={new Array(2).fill(null).map((_, i) => {
            const id = String(i + 1)
            if (id == '1') {
              return {
                label: `链接邀请`,
                key: id,
                children: <Link project_id={props.project_id} />,
              }
            } else {
              return {
                label: `邮箱邀请`,
                key: id,
                children: <Email project_id={props.project_id} />,
              }
            }
          })}
        />
      </div>,
      document.body,
    )
  } else {
    return <div style={{ display: 'none' }}></div>
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Invite)
