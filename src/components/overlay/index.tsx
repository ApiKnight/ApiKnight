import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'

const Overlay: React.FunctionComponent<{ data: number }> = (
  props = { data: 10000 },
) => {
  return ReactDOM.createPortal(
    <div className='Overlay' style={{ zIndex: String(props.data) }}></div>,
    document.body,
  )
}

export default Overlay
