import React, { useEffect, useState } from 'react'
import getProjectMember from '@/api/getProjectMember'
import { useLocation } from 'react-router-dom'
import { Avatar, Button, List, Skeleton, Modal, message } from 'antd'
import './index.less'
import getApplyList from '@/api/getApplyList'
import updateApply from '@/api/updateApply'

// interface DataType {
//   gender?: string;
//   name: {
//     title?: string;
//     first?: string;
//     last?: string;
//   };
//   email?: string;
//   picture: {
//     large?: string;
//     medium?: string;
//     thumbnail?: string;
//   };
//   nat?: string;
//   loading: boolean;
// }

const count = 3

const MemberMgt: React.FC = () => {
  const state = useLocation().state
  const { project_id } = state

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [initLoading, setInitLoading] = useState(true)

  const [moreLoading, setMoreLoading] = useState(false)

  const [member_list, setMemberList] = useState()

  const [apply_list, setApplyList] = useState()

  const showModal = () => {
    getApplyList(project_id).then((res) => {
      if (res.data.code === 200) {
        setApplyList(res.data.data)
        console.log(res.data.data)
      } else {
        console.log('审批列表拉取失败')
      }
    })
    setIsModalOpen(true)
  }

  useEffect(() => {
    getProjectMember(project_id).then((res) => {
      if (res.data.code === 200) {
        let data = res.data.data
        setMemberList(
          data.map((value) => {
            setInitLoading(false)
            value.key = value.user_id
            return value
          }),
        )
      } else {
        console.log('拉取成员列表失败')
      }
    })
  }, [])

  const onLoadMore = () => {
    setMoreLoading(true)
    setMemberList(
      member_list.concat([...new Array(count)].map(() => ({ loading: true }))),
    )
    setMoreLoading(false)
    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    // In real scene, you can using public method of react-virtualized:
    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    // window.dispatchEvent(new Event('resize'));
  }

  const loadMore =
    !initLoading && !moreLoading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}>
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null

  const approval = () => {
    let apply_obj = {
      projectid: project_id,
      status: '1',
      id: '',
    }
    updateApply(apply_obj).then((res) => {
      res.code === 200 ? message.success('已同意') : message.error('操作失败')
    })
  }

  const refuse = () => {
    let apply_obj={
      projectid:project_id,
      status:'-1',
      id:''
    }
    updateApply(apply_obj).then(res=>{
      res.code === 200 ?  message.success('已拒绝')  :  message.error('操作失败')
    })
  }

  return (
    <div className='membermgt'>
      <div className='title'>成员/权限管理</div>

      <div className='apply'>
        <Button type='primary' onClick={showModal} className='button'>
          审批列表
        </Button>

        <Modal title='申请人' open={isModalOpen} footer={null}>
          <List
            className='list'
            loading={initLoading}
            itemLayout='horizontal'
            // loadMore={loadMore}
            dataSource={apply_list}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type='primary' style={{ backgroundColor: 'purple' }} onClick={refuse}>
                    拒绝
                  </Button>,
                  <Button
                    type='primary'
                    style={{ backgroundColor: 'green' }}
                    onClick={approval}>
                    同意
                  </Button>,
                ]}
                key={item.user_id}>
                <Skeleton avatar title={false} loading={initLoading} active>
                  <List.Item.Meta
                    // avatar={<Avatar src={item.avatar_url} />}
                    title={<a href='https://ant.design'>{item.name}</a>}
                    // description={`身份${item.role}`}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Modal>
      </div>

      <List
        className='list'
        loading={initLoading}
        itemLayout='horizontal'
        loadMore={loadMore}
        dataSource={member_list}
        renderItem={(item) => (
          <List.Item
            actions={[<Button>权限</Button>, <Button danger>移除</Button>]}
            key={item.user_id}>
            <Skeleton avatar title={false} loading={initLoading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar_url} />}
                title={<a href='https://ant.design'>{item.name}</a>}
                description={`身份${item.role}`}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  )
}

export default MemberMgt
