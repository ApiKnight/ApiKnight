import React, {useState} from "react";
import MethodList from "@/components/MethodList";
import "./index.less";
import { CloseOutlined } from '@ant-design/icons';

const Tab: React.FunctionComponent = () => {
    const [show,setShow] = useState(false);
    function changeShowState() {
        setShow(!show)
    }
    function closeThisPage() {
        console.log("关闭当前标签页");
    }
    return (
        <div className="tab" onMouseEnter={changeShowState} onMouseLeave={changeShowState}>
            <div className="tab-title">

            </div>
            <div className="tab-content">
                <span style={{marginRight: "2.5px"}}><MethodList value={"FILE"} /></span>
                <span>getList</span>
            </div>
            <div className="tab-closed">
                { show && <CloseOutlined onClick={closeThisPage}/> }
            </div>
        </div>
    )
}

export default Tab;
