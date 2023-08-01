import React from 'react'
import './index.less'
import { Link } from 'react-router-dom'
import request from '../../api/request'

//test
request
	.get('holiday/single/20181121', {
		params: {
			ignoreHoliday: false,
			app_id: 'bolpgeq7pltiflnj',
			app_secret: 'd0JZQ2N1bUQ2djJBSXFFSm92ZVpWdz09'
		}
	})
	.then((res) => {
		console.log('res', res)
	})

const Home: React.FunctionComponent = () => {
	return (
		<div>
			<div>主页</div>
			<div>
				<Link to='/project'>项目1</Link>
			</div>
			<div>
				<Link to='/user'>用户中心</Link>
			</div>
		</div>
	)
}

export default Home
