import React, { useEffect, useState } from 'react'
import getProjectMember from '@/api/getProjectMember'
import { useLocation } from 'react-router-dom'
import {
  Avatar,
  Button,
  List,
  Skeleton,
  Modal,
  message,
  Dropdown,
  App,
  Popconfirm,
  Tag,
} from 'antd'
import './index.less'
import getApplyList from '@/api/getApplyList'
import updateApply from '@/api/updateApply'
import type { MenuProps } from 'antd'
import updateAuthority from '@/api/updateAuthority'
import getCurrentRole from '@/api/getCurrentRole'
import reqDelMember from '@/api/reqDelMember'
import chgProjAdmin from '@/api/chgProjAdmin'
import ShowMember from '@/components/ShowMember'
import { createAllMonitor } from '../../../../sdk'

const count = 3

const MemberMgt: React.FC = () => {
  createAllMonitor().start()
  const state = useLocation().state
  const { project_id } = state

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [initLoading, setInitLoading] = useState(true)

  const [moreLoading, setMoreLoading] = useState(false)

  const [member_list, setMemberList] = useState<Array<any>>()

  const [apply_list, setApplyList] = useState([])

  const [dNumber, setDNumber] = useState(0)

  const [number, setNumber] = useState(1)

  useEffect(() => {
    getApplyList(project_id).then((res: any) => {
      if (res.data.code === 200) {
        setDNumber(res.data.data.length)
      } else {
        console.log('审批列表拉取失败')
      }
    })
  }, [])

  const [currentUid, setCurrentUid] = useState<string>('')
  const [role, setRoleState] = useState<number>(0)
  const showModal = () => {
    updateApplyList()
    setIsModalOpen(true)
  }

  const updateApplyList = () => {
    getApplyList(project_id).then((res: any) => {
      if (res.data.code === 200) {
        setApplyList(res.data.data.reverse())
      } else {
        console.log('审批列表拉取失败')
      }
    })
  }

  async function getCurRole(project_id) {
    let res: any = await getCurrentRole(project_id)
    res.data.code === 200 ? setRoleState(res.data.data.role) : ''
    updateMemberList()
  }

  const updateMemberList = () =>
    getProjectMember(project_id).then((res: any) => {
      if (res.data.code === 200) {
        let data = res.data.data
        setNumber(data.length)
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

  useEffect(() => {
    getCurRole(project_id)
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

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const loadMore =
    !initLoading && !moreLoading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        {/* <Button onClick={onLoadMore}>loading more</Button> */}
      </div>
    ) : null

  const approval = (id) => {
    return () => {
      let apply_obj = {
        projectid: project_id,
        status: '1',
        id: id,
      }
      updateApply(apply_obj).then((res) => {
        res.data.code === 200
          ? (message.success('已同意'), updateApplyList(), updateMemberList())
          : message.error('操作失败')
      })
    }
  }

  const refuse = (id) => {
    return () => {
      let apply_obj = {
        projectid: project_id,
        status: '-1',
        id: id,
      }
      updateApply(apply_obj).then((res) => {
        res.data.code === 200
          ? (message.success('已拒绝'), updateApplyList())
          : message.error('操作失败')
      })
    }
  }

  const setAuthority = (authority) => {
    return () => {
      if (authority === 'admin') {
        chgProjAdmin({
          user_id: currentUid,
          project_id: project_id,
        }).then((res) => {
          res.data.code === 200
            ? (message.success('修改成功'),
              getCurRole(project_id),
              updateMemberList())
            : message.error('修改失败')
        })
      } else {
        updateAuthority({
          user_id: currentUid,
          project_id: project_id,
          role:
            authority === 'member'
              ? 3
              : authority === 'operator'
              ? 2
              : authority === 'admin'
              ? 1
              : 4,
        }).then((res) => {
          res.data.code === 200
            ? (message.success('修改成功'), updateMemberList())
            : message.error('修改失败')
        })
      }
    }
  }

  const items: MenuProps['items'] = [
    {
      label: <div onClick={setAuthority('tourist')}>设为游客</div>,
      key: '4',
    },
    {
      label: <div onClick={setAuthority('member')}>设为成员</div>,
      key: '3',
    },
    {
      label: <div onClick={setAuthority('operator')}>设为管理者</div>,
      key: '2',
    },
    // {
    //   type: 'divider',
    // },
    {
      label: <div onClick={setAuthority('admin')}>设为所有者</div>,
      key: '1',
    },
  ]

  const qualitySetBtn = (user_id) => {
    // 如果是自己，不展示按钮
    if (user_id === localStorage.getItem('user_id')) return ''

    return role === 1 ? (
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={() => setCurrentUid(user_id)}>权限设置</a>
      </Dropdown>
    ) : (
      ''
    )
  }

  const delMemberHandler = (user_id) => {
    reqDelMember(project_id, user_id).then((res) => {
      res.data.code === 200
        ? (message.success('移除成功'), updateMemberList())
        : message.error('移除失败')
    })
  }

  const delMemberBtn = (userRole, user_id) => {
    // 如果是自己，不展示按钮
    if (user_id === localStorage.getItem('user_id')) return ''

    console.log(role, userRole)

    return role < userRole && role !== 0 ? (
      <Popconfirm
        title='谨慎操作！'
        description='确定移除该成员吗?'
        onConfirm={() => {
          delMemberHandler(user_id)
        }}
        // onCancel={cancel}
        okText='确定'
        cancelText='取消'
      >
        <Button danger>移除</Button>
      </Popconfirm>
    ) : (
      ''
    )
  }
  const showData = {
    numberCount: number,
    dNumberCount: dNumber,
  }
  return (
    <App>
      <div className='membermgt'>
        {/* <div className='title'>成员/权限管理</div> */}
        {/* <Tag color='#2db7f5'>
          <h2>成员/权限管理</h2>
        </Tag> */}
        <ShowMember data={showData} />
        {role === 1 || role === 2 ? (
          <div className='apply'>
            {/* <Tag color='blue'>
              <h3>成员管理</h3>
            </Tag> */}
            <div className='title-wrap'>
              <h3>成员管理</h3>
              <Button type='primary' onClick={showModal} className='button'>
                审批列表
              </Button>
            </div>

            <div>
              <Modal
                title='申请人'
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
              >
                <List
                  className='list'
                  loading={initLoading}
                  itemLayout='horizontal'
                  // loadMore={loadMore}
                  dataSource={apply_list}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <>
                          {item.status === 0 ? (
                            <>
                              <Button
                                type='primary'
                                danger
                                // style={{ backgroundColor: 'purple' }}
                                onClick={refuse(item.id)}
                                disabled={role !== 1 && role !== 2}
                              >
                                拒绝
                              </Button>
                              ,
                              <Button
                                type='primary'
                                // style={{ backgroundColor: 'green' }}
                                onClick={approval(item.id)}
                                disabled={role !== 1 && role !== 2}
                              >
                                同意
                              </Button>
                            </>
                          ) : item.status === 1 ? (
                            <Button
                              disabled
                              type='default'
                              // style={{
                              //   backgroundColor: 'green',
                              //   opacity: '50%',
                              //   color: 'black',
                              // }}
                            >
                              已同意
                            </Button>
                          ) : item.status === -1 ? (
                            <Button
                              disabled
                              type='primary'
                              style={{
                                backgroundColor: 'red',
                                opacity: '50%',
                                color: 'black',
                              }}
                            >
                              已拒绝
                            </Button>
                          ) : (
                            ''
                          )}
                        </>,
                      ]}
                      key={item.id}
                    >
                      <Skeleton
                        avatar
                        title={false}
                        loading={initLoading}
                        active
                      >
                        <List.Item.Meta
                          // avatar={<Avatar src={item.avatar_url} />}
                          title={item.name}
                          // description={`身份${item.role}`}
                        />
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </Modal>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className='apply-modal'>
          <List
            className='list'
            loading={initLoading}
            itemLayout='horizontal'
            loadMore={loadMore}
            dataSource={member_list}
            renderItem={(item) => (
              <List.Item
                actions={[
                  qualitySetBtn(item.user_id),
                  delMemberBtn(item.role, item.user_id),
                ]}
                key={item.user_id}
              >
                <Skeleton avatar title={false} loading={initLoading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar_url} alt='头像' />}
                    title={item.name}
                    description={`身份：${
                      item.role === 1
                        ? '管理者'
                        : item.role === 2
                        ? '管理员'
                        : item.role === 3
                        ? '成员'
                        : '游客'
                    }`}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    </App>
  )
}

export default MemberMgt
