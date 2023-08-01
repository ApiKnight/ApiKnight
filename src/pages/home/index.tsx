import React from 'react'
import './index.less'
import { Link } from 'react-router-dom'

const Home: React.FunctionComponent = () => {
    return (
        <div>
            <div>主页</div>
            <div><Link to='/project'>项目1</Link></div>
            <div><Link to='/user'>用户中心</Link></div>
        </div>
    )
}

export default Home
