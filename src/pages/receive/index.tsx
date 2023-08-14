import React, {useEffect, useState} from "react";
import { Button, Input, message, notification } from 'antd'
import "./index.less"
import {useNavigate, useSearchParams} from "react-router-dom";
import request from "@/api/request";
import type { NotificationPlacement } from 'antd/es/notification/interface'

const Receive:React.FunctionComponent = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const [api, contextHolder] = notification.useNotification()
    function sendJoin() {
        request.post("/v1/invite/receive",{projectid:Number(searchParams.get('projectid'))},{}).then((resp)=>{
            console.log(resp.data.message)
            const openNotification = (placement: NotificationPlacement) => {
                api.info({
                    message: <p>{resp.data.message}</p>,
                    description: <p>3s后返回主界面</p>,
                    placement,
                })
            }
            openNotification('topLeft')
            setTimeout(()=>{
                navigate('/')
            },3000)
        })
    }
    const [projectName,setProjectName] = useState('')
    useEffect(()=>{
        request.post(`/v1/project/query`,{projectid:Number(searchParams.get('projectid'))},{}).then((resp:any)=>{
            setProjectName(resp.data.data.projectname as string)
        })
    },[])
    return (
        <div className="receive">
            {contextHolder}
            <h1>ApiKnight</h1>
            <p>
                刘宇洋 在 ApiKnight 中邀请您加入 <strong>{projectName}</strong> 项目
            </p>
            <div className="receive-btn">
                <Button type="primary" size="large" onClick={sendJoin}>立即加入</Button>
            </div>
            <p>
                ApiKnight - 节约团队每一分钟
            </p>
            <p>
                ApiKnight.com
            </p>
        </div>
    )
}

export default Receive;
