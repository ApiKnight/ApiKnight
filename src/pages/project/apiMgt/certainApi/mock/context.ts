import React from 'react'
interface IMode {
  mode: 'run' | 'mock'
}

const ModeContext = React.createContext<IMode>({ mode: 'run' })

export default ModeContext
