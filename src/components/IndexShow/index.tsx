import React from 'react'
import './index.less'
import { IndexProps } from '@/types/indexShow'

const ShowIndex: React.FC<IndexProps> = (props: IndexProps) => {
  return (
    <div className='showIndex'>
      <div className='showIndex-Icon'>
        {/*<RadarChartOutlined style={{fontSize:"60px"}}/>*/}
        {props.data.icon}
      </div>
      <div className='showIndex-content__title'>
        <h1>{props.data.title}</h1>
      </div>
      <div className='showIndex-content__desc'>
        <div>{props.data.desc}</div>
      </div>
    </div>
  )
}

export default ShowIndex
