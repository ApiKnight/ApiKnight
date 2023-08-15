// import React, { useEffect, useState } from 'react'
// import './index.less'
// import getProjectMember from '@/api/getProjectMember'
// import { useLocation } from 'react-router-dom'

// const MemberMgt: React.FunctionComponent = () => {
//   const state = useLocation().state
//   const {project_id} = state
  
//   const [member_list, setMemberList] = useState([])
//   useEffect(() => {
//     getProjectMember(project_id).then((res) => {
//       res.data.code === 200
//         ? setMemberList(res.data.data)
//         : console.log('拉取成员列表失败')
//     })
//   },[])
//   return (
//     <div className='membermgt'>
//       <div className='title'>成员/权限管理</div>
//       <div className="list">
//         <ul>
//           {
//             member_list.map(item=>{
//               return <li key={item.id}>
//                 <div>昵称:{item.name}</div>
//                 <div>身份:{item.role}</div>
//               </li>
//             })
//           }
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default MemberMgt


import React, { useEffect, useState } from 'react';
import getProjectMember from '@/api/getProjectMember'
import { useLocation } from 'react-router-dom'
import { Avatar, Button, List, Skeleton } from 'antd';
import './index.less'
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

const count = 3;

const MemberMgt: React.FC = () => {
  const state = useLocation().state
  const {project_id} = state

  const [initLoading, setInitLoading] = useState(true);

  const [moreLoading, setMoreLoading] = useState(false);

  const [member_list, setMemberList] = useState()
  useEffect(() => {
    getProjectMember(project_id).then((res) => {
      if(res.data.code === 200){
        let data = res.data.data
        setMemberList(data.map(value=>{
          setInitLoading(false)
          value.key=value.user_id
          return value
        }))
      }else{
        console.log('拉取成员列表失败')
      }
    })
  },[])

  const onLoadMore = () => {
    setMoreLoading(true);
    setMemberList(
      member_list.concat([...new Array(count)].map(() => ({ loading: true}))
      ))
      setMoreLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        // window.dispatchEvent(new Event('resize'));
  };

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
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={member_list}
      renderItem={(item) => (
        <List.Item
          actions={[<Button key="list-loadmore-edit">权限设置</Button>, <Button danger key="list-loadmore-more">移除</Button>]}
          key={item.user_id}
        >
          <Skeleton avatar title={false} loading={initLoading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar_url} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={`身份${item.role}`}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default MemberMgt;
