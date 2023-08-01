import React from 'react'
import './index.less'
import { Outlet, Link } from 'react-router-dom'
const Project: React.FunctionComponent = () => {
	return (
		<>
			<div>
				<div>具体项目</div>
				<ul>
					<li>
						<Link to='/project/apiMgt'>接口管理</Link>
					</li>
					<li>
						<Link to='/project/memberMgt'>成员/权限管理</Link>
					</li>
					<li>
						<Link to='/project/memberMgt'>项目管理</Link>
					</li>
				</ul>
				<Outlet />
			</div>
		</>
	)
}

export default Project
