import React from 'react'
import ModeContext from '../context'

// 高阶组件：统一添加mode属性
function withMode(WrappedComponent: React.FunctionComponent<any>) {
  return function (props: any) {
    return (
      <ModeContext.Consumer>
        {(value) => <WrappedComponent {...props} {...value} />}
      </ModeContext.Consumer>
    )
  }
}

export default withMode
