import React, { useEffect, useState } from 'react'
import './index.less'
import MockReqParams from './c-pages/mock-req-params'
import MockResponse from './c-pages/mock-response'
import MockUrl from './c-pages/mock-url'
import { useAppDispatch } from '@/store'
import { changeMockModeAction, fetchApiDataAction } from '@/store/modules/mock'
import { IMockProps } from './type'
import ModeContext from './mode-context'
import { Button, Modal } from 'antd'
import { Divider, List, Typography } from 'antd'
import getMockList from '@/api/getMockList'

const Mock: React.FunctionComponent<IMockProps> = (props) => {
  const { mode, data, project_id } = props //run为运行,mock为mock
  const api_id = '' //获取api_id，从外部传进来，暂时置空
  // mock列表弹框
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  // mock列表
  const [mockList, setMockList] = useState<Array<any>>([])
  const dispatch = useAppDispatch()
  dispatch(changeMockModeAction(mode))

  // 根据接口id获取接口信息
  dispatch(fetchApiDataAction(data))

  // useEffect(() => {}, [])

  /**
   * 关闭mock列表弹框
   */
  const closeModal = () => {
    setIsModalOpen(false)
  }
  /**
   * 获取mock列表，打开mock列表弹框
   */
  const openModal = () => {
    getMockList(project_id, api_id).then((res) => {
      res.data.code === 200 ? setMockList(res.data.data.list) : ''
    })
    setIsModalOpen(true)
  }
  return (
    <div>
      {/* mock列表弹框 */}
      {/* <Modal
        title='mock服务列表'
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Divider orientation='left'>Default Size</Divider>
        <List
          header={<div>一个mock附属于具体的某个api</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>{`[mock名称]`}</Typography.Text>
              {'\u00A0'}
              {'\u00A0'}
              {'\u00A0'}
              {'\u00A0'}
              {`[mock方法]`}
            </List.Item>
          )}
        />
      </Modal> */}

      <div className='mock-page'>
        <ModeContext.Provider value={{ ...props }}>
          {/* 请求参数组件，当为mock,改成响应格式 */}
          <MockUrl project_id={project_id} mode={{ mode }} />
          {/* 当选中mock的时候，显示 mock列表 按钮 */}
          {/* {mode === 'mock' ? (
            <Button
              type='primary'
              style={{ margin: '10px 0' }}
              onClick={openModal}>
              mock列表
            </Button>
          ) : (
            ''
          )} */}
          <MockReqParams />
          <MockResponse />
        </ModeContext.Provider>
      </div>
    </div>
  )
}

export default Mock
