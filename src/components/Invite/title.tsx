import React, {useEffect, useState} from "react";
import "./title.less"
import {PoweroffOutlined} from '@ant-design/icons';

const Title: React.FunctionComponent = () => {
    return (
        <div className="invite-title">
            <h2>邀请加入示例项目</h2>
            <div className="invite-title__close">
                <PoweroffOutlined />
            </div>
        </div>
    );
}

export default Title;
