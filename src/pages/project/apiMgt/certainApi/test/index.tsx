import React from 'react'
import './index.less'
import { useLocation } from 'react-router-dom'

const Test: React.FunctionComponent = () => {
  const state = useLocation().state

  return <div>Test</div>
}

export default Test
