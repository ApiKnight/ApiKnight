import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import RightMenu from '@/components/RightMenu'
import Overview from '@/pages/project/apiMgt/overview'

const RightComponent: React.FunctionComponent = () => {
  const rightSlice = useSelector((state: RootState) => state.rightSlice.value)
  return (
    <div>
      <div>
        {rightSlice === '0' && rightSlice === '' && rightSlice !== 'gl' && (
          <div>新建xx(默认页面)</div>
        )}
      </div>
      <div>
        {rightSlice == 'gl' && (
          <div>
            <Overview />
          </div>
        )}
      </div>
      {/* 下面的div里加入右边组件。 rightSlice就是我要传的  id */}
      <div>
        {rightSlice !== '0' && rightSlice !== '' && rightSlice !== 'gl' && (
          <div>
            <RightMenu data={rightSlice} />
          </div>
        )}
      </div>
    </div>
  )
}

export default RightComponent
