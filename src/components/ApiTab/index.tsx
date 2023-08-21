import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/index.ts'
import UserInfo from '@/components/UserInfo'
import { Button } from 'antd'
import { setValue } from '@/store/modules/userInfoSlice'
import "./index.less"
import { Link } from 'react-router-dom'

const ApiTab:React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const userInfoSlice = useSelector(
        (state: RootState) => state.userInfoSlice.value,
    )
    function showUserInfo() {
        dispatch(setValue(true))
    }
    return (
        <div className='ApiTab'>
            <h1>
                <Link
                    to='/user'
                    state={{ user_id: localStorage.getItem('user_id') }}
                >
                    ApiKnight
                </Link>
            </h1>
            <div className='ApiTab-person'>
                <Button onClick={showUserInfo} size='large'>个人</Button>
            </div>
            {userInfoSlice && <UserInfo />}
        </div>
    )
}

export default ApiTab;