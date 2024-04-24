import React, { useCallback, useEffect, useState } from 'react'
import './title.less'
import { PoweroffOutlined } from '@ant-design/icons'
import Overlay from '@/components/overlay'
import { querySummaryProject } from '@/api/project'
import { setStateFlag, useStateFlag } from '@/region/stateFlag'

const Title: React.FunctionComponent<{ projectid: string | number }> = (
  props,
) => {
  const flag = useStateFlag()
  const closeInvite = useCallback((): void => {
    setStateFlag(false)
  }, [])
  const [name, setName] = useState('示例')
  useEffect(() => {
    const func = async () => {
      const resp = await querySummaryProject(props.projectid)
      if (resp.code == 200) {
        setName(resp.data.projectname)
      }
    }
    func()
  }, [props.projectid])
  return (
    <div className='invite-title'>
      <h2>邀请加入{name}项目</h2>
      <div className='invite-title__close' onClick={closeInvite}>
        <PoweroffOutlined />
      </div>
      {flag && <Overlay data={10000} />}
    </div>
  )
}

export default Title
