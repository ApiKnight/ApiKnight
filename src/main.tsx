import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/index.less'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'
import { ConfigProvider, ThemeConfig } from 'antd'

// 定制主题
const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
  },
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>,
)
