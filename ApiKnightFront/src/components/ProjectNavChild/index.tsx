import { Avatar } from 'antd'
import React from 'react'
import classNames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'
import './index.less'
import { ProjectNavChildType } from '@/types/projectNavChild'
import { pathList } from './constant'
import { setStateFlag } from '@/region/stateFlag'

const ProjectNavChild: React.FunctionComponent<{
  data: ProjectNavChildType
}> = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  function show(): void {
    setStateFlag(true)
  }
  const onClick = () => {
    // 输出url
    switch (props.data.key) {
      case '1':
        navigate('/project/apiMgt', { state: props.data.props })
        setStateFlag(false)
        break
      case '2':
        navigate('/project/memberMgt', { state: props.data.props })
        setStateFlag(false)
        break
      case '3':
        navigate('/project/projectSet', { state: props.data.props })
        setStateFlag(false)
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
        <Avatar size='small' icon={props.data.avatar} alt='头像信息'></Avatar>
      </div>
      <div className={classNames('projectNavChild-content')}>
        <h5>{props.data.content}</h5>
      </div>
    </div>
  )
}
export default ProjectNavChild
