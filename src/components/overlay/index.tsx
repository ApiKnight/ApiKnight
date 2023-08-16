import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'

const Overlay: React.FunctionComponent = () => {
  return ReactDOM.createPortal(<div className='Overlay'></div>, document.body)
}

export default Overlay
