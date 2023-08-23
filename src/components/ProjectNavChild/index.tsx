import { Avatar } from 'antd'
import React from 'react'
import classNames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './index.less'
import { ProjectNavChildType } from '@/types/projectNavChild'
import { reversal, setFalse } from '@/store/modules/stateFlag'

const pathList = [
  '/project/apiMgt',
  '/project/memberMgt',
  '/project/projectSet',
]

const ProjectNavChild: React.FunctionComponent<{
  data: ProjectNavChildType
}> = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function show(): void {
    dispatch(reversal())
  }
  const onClick = () => {
    // 输出url
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

  // 判断当前选项是否代表当前页面
  const getIsActive = () => {
    if (pathList.includes(location.pathname)) {
      return location.pathname === pathList[Number(props.data.key) - 1]
    }
    return false
  }

  return (
    <div
      className={classNames('projectNavChild', {
        active: getIsActive(),
      })}
      onClick={onClick}>
      <div className='projectNavChild-avater'>
        <Avatar size='small' icon={props.data.avatar}></Avatar>
      </div>
      <div className={classNames('projectNavChild-content')}>
        <h5>{props.data.content}</h5>
      </div>
    </div>
  )
}
export default ProjectNavChild
