import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'

// eslint-disable-next-line react-refresh/only-export-components
const Overlay: React.FunctionComponent<{ data: number }> = (
  props = { data: 10000 },
) => {
  return ReactDOM.createPortal(
    <div className='Overlay' style={{ zIndex: String(props.data) }}></div>,
    document.body,
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Overlay)
