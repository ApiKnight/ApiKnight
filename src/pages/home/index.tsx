import React from 'react'
import './index.less'
import { Link } from 'react-router-dom'
import request from '../../api/request'
import { Counter } from '../../components/Counter.tsx'
import { fetchProjectList } from '../../store/modules/projectSlice.ts'
import { useDispatch } from 'react-redux'
//axios test

// request
// 	.get('holiday/single/20181121', {
// 		params: {
// 			ignoreHoliday: false,
// 			app_id: 'bolpgeq7pltiflnj',
// 			app_secret: 'd0JZQ2N1bUQ2djJBSXFFSm92ZVpWdz09'
// 		}
// 	})
// 	.then((res) => {
// 		console.log('axios test res', res)
// 	})

const Home: React.FunctionComponent = () => {
  let dispatch = useDispatch()

  //redux test
  React.useEffect(() => {
    dispatch(fetchProjectList() as any)
  }, [])

  return (
    <div>
      <div>主页</div>
      <div>
        <Link to='/project'>项目1</Link>
      </div>
      <div>
        <Link to='/user'>用户中心</Link>
      </div>
      <div>
        <Counter />
      </div>
    </div>
  )
}

export default Home
