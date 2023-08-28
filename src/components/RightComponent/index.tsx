import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import RightMenu from '@/components/RightMenu'
import Overview from '@/pages/project/apiMgt/overview'
import './index.less'
import LogoPage from '@/pages/project/apiMgt/certainApi/logo-page'

const RightComponent:React.FC<{project_id: string}> = (props) => {
  const rightSlice = useSelector((state: RootState) => state.rightSlice.value)
  return (
    <div className='right-component-wrap'>
      {rightSlice == 'gl' && <Overview />}
      {rightSlice === 'blank' && <LogoPage />}
      {rightSlice !== 'gl' && rightSlice !== 'blank' && (
        <RightMenu data={rightSlice} project_id={props.project_id} />
      )}
    </div>
  )
}

export default RightComponent
