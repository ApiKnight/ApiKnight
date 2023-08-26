import MemberInfo from './MemberInfo'
import './index.less'
import React, { useEffect } from 'react'

interface Props {
  data: {
    numberCount: number
    dNumberCount: number
  }
}

const ShowMember: React.FC<Props> = (props) => {
  const d = [
    {
      key: '1',
      count: props.data.numberCount,
      label: '成员',
    },
    {
      key: '2',
      count: props.data.dNumberCount,
      label: '待定',
    },
  ]
  return (
    <div className='showMember'>
      {d.map((item) => {
        return <MemberInfo key={item.key} data={item} />
      })}
    </div>
  )
}

export default ShowMember
