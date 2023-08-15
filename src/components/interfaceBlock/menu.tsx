import React, {useEffect, useState} from "react";
import { UnorderedListOutlined } from '@ant-design/icons';
import { Button, Popover, Space } from 'antd';
import {increment} from "@/store/modules/watchDir";
import {AddData} from "@/types/treeComponents";
import {useDispatch} from "react-redux";
import {setTrue} from "@/store/modules/createFileState";
import CreateFile from "@/components/createFile";

const Menu: React.FunctionComponent<{ data: AddData }> = (props) => {
    const { data } = props
    const dispatch = useDispatch();
    function addChildDir() {
        // fetch("http://47.112.108.202:7002/api/v1/folder/create", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + localStorage.getItem('token') as string
        //     },
        //     body: JSON.stringify({
        //         project_id: 1063,
        //         parent_id: data.key,
        //         name: "测试文件夹"
        //     })
        // })
        //     .then(response => response.json())
        //     .then(res => {
        //         // 在这里处理返回的数据
        //         if (res.code == 200) {
        //             dispatch(increment())
        //         }
        //     })
        //     .catch(error => {
        //         // 在这里处理错误
        //         console.error(error);
        //     });
        dispatch(setTrue())
    }
    useEffect(()=>{
        setPData({
            project_id: proId,
            parent_id: data.key
        })
    },[data])
    const content = (
        <div>
            <p><Button block onClick={addChildDir}>添加子目录</Button></p>
            <p><Button block>导出</Button></p>
        </div>
    );
    const proId = 1063
    const [pData,setPData] = useState(
        {
            project_id: 0,
            parent_id: ""
        }
    );
    return (
        <span>
                <Popover content={content} title="" trigger="click">
                  <UnorderedListOutlined />
                </Popover>
                <CreateFile data={pData} />
        </span>
    )
}

export default Menu;
