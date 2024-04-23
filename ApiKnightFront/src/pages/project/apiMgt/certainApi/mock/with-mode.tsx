import React, { ReactNode, FunctionComponent } from 'react'
import ModeContext from './mode-context'

// 高阶组件：统一添加mode属性
function withMode<P>(
  WrappedComponent: FunctionComponent<P & { mode: string }>,
) {
  return function (props: P): ReactNode {
    return (
      <ModeContext.Consumer>
        {(value) => <WrappedComponent {...props} {...value} />}
      </ModeContext.Consumer>
    )
  }
}

export default withMode
