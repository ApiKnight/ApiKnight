import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Select, message, Upload } from 'antd'

const { Dragger } = Upload

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}

const Swagger: React.FunctionComponent = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <div className='swagger'>
      <div className='swagger-title'>
        <h1>导入数据</h1>
      </div>
      <div className='swagger-select'>
        <Select
          defaultValue='Swagger'
          style={{ width: '250px' }}
          onChange={handleChange}
          options={[{ value: 'Swagger', label: 'OpenApi Swagger/Swagger' }]}
        />
      </div>
      <div>
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </div>
    </div>
  )
}

export default Swagger
