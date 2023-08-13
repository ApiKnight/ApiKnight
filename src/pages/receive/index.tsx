import React from "react";
import {Button} from "antd";
import "./index.less"
import {useSearchParams} from "react-router-dom";
import request from "@/api/request";

const Receive:React.FunctionComponent = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    function sendJoin() {
        request.post("/v1/invite/receive",{projectid:searchParams.get('projectid')},{}).then((resp)=>{
            console.log("申请成功!!!!");
        })
    }
    return (
        <div className="receive">
            <h1>ApiKnight</h1>
            <p>
                刘宇洋 在 ApiKnight 中邀请您加入 {searchParams.get('projectid')}
            </p>
            <div>
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
