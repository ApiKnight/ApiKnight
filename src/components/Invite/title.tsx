import React, { useCallback, useEffect, useState } from 'react'
import './title.less'
import { PoweroffOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setFalse } from '@/store/modules/stateFlag'
import Overlay from '@/components/overlay'
import { RootState } from '../../store'
import { querySummaryProject } from '@/api/project'

const Title: React.FunctionComponent<{ projectid: string | number }> = (
  props,
) => {
  const dispatch = useDispatch()
  const flag = useSelector((state: RootState) => state.stateFlag.value)
  const closeInvite = useCallback((): void => {
    dispatch(setFalse())
  }, [dispatch])
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
