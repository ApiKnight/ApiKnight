import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import RightMenu from '@/components/RightMenu'
import Overview from '@/pages/project/apiMgt/overview'

const RightComponent: React.FunctionComponent = () => {
  const rightSlice = useSelector((state: RootState) => state.rightSlice.value)
  return (
    <>
      {/* <>
        {rightSlice === '0' && rightSlice === '' && rightSlice !== 'gl' && (
        {rightSlice === '0' ||
          rightSlice === '' ||
          (rightSlice !== 'gl' && <div>新建xx(默认页面)</div>)}
      </> */}
      {rightSlice == 'gl' && <Overview />}

      {/* 下面的div里加入右边组件。 rightSlice就是我要传的  id */}
      <>
        {rightSlice !== '0' && rightSlice !== '' && rightSlice !== 'gl' && (
          // <div>
          <RightMenu data={rightSlice} />
          // </div>
        )}
      </>
    </>
  )
}

export default RightComponent
