import React from 'react'
import "./addBtn.less"
import { useSelector, useDispatch } from 'react-redux'
import {
  increment,
} from '@/store/modules/dirArraySlice.ts'
import InterfaceBlock from './interfaceBlock.tsx';
import { RootState } from '@/store/index.ts';


interface AddData {
  id: number;
  pid: number
}

const AddBtn: React.FunctionComponent<{data:AddData}> = (props) => {
    const dispatch = useDispatch();
    const {data} = props;
    return (
        <span style={{display:"inline"}} onClick={()=>{
          // 这里是插入示例
            dispatch(increment({key: 3, title: <InterfaceBlock data={{
              id:data.id,
              title:"接口目录n",
              pid: data.pid
          }}/>,type:"file", pid: data.pid}))
          // console.log("add")
            // console.log(dirArray);
          }}>
            <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6279" width="24.5" height="24.5"><path d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m34.133333 213.333333c4.693333 0 8.533333 3.84 8.533334 8.533333V469.333333h140.8c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H554.666667v140.8a8.533333 8.533333 0 0 1-8.533334 8.533334h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533334V533.333333h-140.8a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334H490.666667v-140.8c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933333z" fill="#333333" p-id="6280"></path></svg>
        </span>
    )
}

export default AddBtn
