import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import RightMenu from '@/components/RightMenu'

const RightComponent: React.FunctionComponent = () => {
  const rightSlice = useSelector((state: RootState) => state.rightSlice.value)
  return (
    <div>
      <div>
        {rightSlice === '0' && rightSlice === '' && <div>新建xx(默认页面)</div>}
      </div>
      {/* 下面的div里加入右边组件。 rightSlice就是我要传的  id */}
      <div>
        {rightSlice !== '0' && rightSlice !== '' && (
          <div>
            <RightMenu data={rightSlice} />
          </div>
        )}
      </div>
    </div>
  )
}

export default RightComponent
