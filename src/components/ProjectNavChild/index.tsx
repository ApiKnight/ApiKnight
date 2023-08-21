import { Avatar } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './index.less'
import { ProjectNavChildType } from '@/types/projectNavChild'
import { reversal, setFalse } from '@/store/modules/stateFlag'

const ProjectNavChild: React.FunctionComponent<{
  data: ProjectNavChildType
}> = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function show(): void {
    dispatch(reversal())
  }
  const onClick = () => {
    switch (props.data.key) {
      case '1':
        navigate('/project/apiMgt', { state: props.data.props })
        dispatch(setFalse())
        break
      case '2':
        navigate('/project/memberMgt', { state: props.data.props })
        dispatch(setFalse())
        break
      case '3':
        navigate('/project/projectSet', { state: props.data.props })
        dispatch(setFalse())
        break
      case '4':
        show()
        break
      default:
        ''
    }
  }
  return (
    <div className='projectNavChild' onClick={onClick}>
      <div className='projectNavChild-avater'>
        <Avatar size='small' icon={props.data.avatar}></Avatar>
      </div>
      <div className='projectNavChild-content'>
        <h5>{props.data.content}</h5>
      </div>
    </div>
  )
}
export default ProjectNavChild
