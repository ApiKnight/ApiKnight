import React, { useEffect, useState } from 'react'
import './title.less'
import { PoweroffOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setFalse } from '@/store/modules/stateFlag'
import Overlay from '@/components/overlay'
import { RootState } from '../../store'
import request from '../../api/request'
import { AxiosResponse } from 'axios'
import { Result } from '@/api/request.type'
import { QuerySummary } from '@/types/response.type'

const Title: React.FunctionComponent<{ projectid: string | number }> = (
  props,
) => {
  const dispatch = useDispatch()
  const flag = useSelector((state: RootState) => state.stateFlag.value)
  function closeInvite(): void {
    dispatch(setFalse())
  }
  const [name, setName] = useState('示例')
  useEffect(() => {
    request
      .post('/v1/project/querysummary', { projectid: props.projectid }, {})
      .then((resp: AxiosResponse<Result<QuerySummary>>) => {
        if (resp.data.code == 200) {
          setName(resp.data.data.projectname)
        }
      })
  }, [])
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
