import React, { useEffect } from 'react'
import Mock from '@/pages/project/apiMgt/certainApi/mock'
import Document from '@/pages/project/apiMgt/certainApi/document'
import Introduction from '@/pages/project/apiMgt/certainApi/introduction'

const RightMenuContent: React.FC<{
  current: string
  data: string
  project_id: string
}> = (props) => {
  const { current, project_id, data } = props
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    console.log('scrollToTop')
    scrollToTop()
  })
  return (
    <div className='panel'>
      {
        //  这里做条件渲染，文档，运行，mock等做成条件渲染，比如if e等于多少的时候渲染文档，等于多少的时候渲染运行
        current === '1' ? (
          <Introduction data={data} />
        ) : current === '2' ? (
          // <div>修改文档组件,同时父组件传入的id为{data}</div>
          <Document data={data} />
        ) : current === '3' ? (
          <Mock mode='run' project_id={project_id} />
        ) : (
          // <div>Mock组件,同时父组件传入的id为{data}</div>
          <Mock mode='mock' project_id={project_id} />
        )
      }
    </div>
  )
}

export default RightMenuContent
