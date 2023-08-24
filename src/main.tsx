import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { App as AntdApp } from 'antd'
import './assets/css/index.less'
import 'nprogress/nprogress.css'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={theme}>
    <AntdApp style={{ height: '100%' }}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AntdApp>
  </ConfigProvider>,
)

// const rest = `{
//   "code": 200,
//   "server_upload_time": 1692885244471,
//   "payload_size_bytes": 9502,
//   "events_ingested": 11
// }
// `

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <div>
//     <Editor height='90vh' defaultLanguage='json' defaultValue={rest} />;
//   </div>,
// )
