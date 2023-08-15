import React from 'react'
import './index.less'
import { useLocation } from 'react-router-dom'

const Mock: React.FunctionComponent = () => {
  const state= useLocation().state

  return (
    <>
      <div>Mock</div>
    </>
  )
}

export default Mock
