import React, { useState } from 'react';
import "./index.less";
import AddBtn from './addBtn';
import DelBtn from './delBtn';
import { createJsErrorMonitor } from '../../../sdk/createJsErrorMonitor';
import { createResourceErrorMonitor } from '../../../sdk/createResourceErrorMonitor';
import { createPromiseErrorMonitor } from '../../../sdk/createPromiseErrorMonitor';
import { createXhrMonitor } from '../../../sdk/createXhrMonitor';

interface TitleNode {
    id: number;
    title: string;
    pid: number
}

interface Props {
    data:TitleNode;
}

interface AddData {
  id: number;
  pid: number
}

function startMonitor() {
  createJsErrorMonitor('renderTree').start();
  createResourceErrorMonitor('renderTree').start();
  createPromiseErrorMonitor('renderTree').start();
  createXhrMonitor('renderTree').start();
}

const InterfaceBlock: React.FunctionComponent<{data:TitleNode}> = (props:Props) => {
    startMonitor();
    const [show,setShowState] = useState(false)
    function changeBtnState():void {
      setShowState(!show);
    }
    const {data} = props; 
    const addData:AddData = {id:data.id,pid:data.pid + 1}
    return (
      <div className='InterfaceBlock' onMouseEnter={changeBtnState} onMouseLeave={changeBtnState}>
        <div>
          { data.title }
        </div>
        {
          show && (
            <div className='btn' >
              <AddBtn data={addData}/>
              <DelBtn data={data.id}/>
            </div>
          )
        }
      </div>
    )
}

export default InterfaceBlock;
