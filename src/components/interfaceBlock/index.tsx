import React, { useState } from 'react';
import "./index.less";
import AddBtn from './addBtn';
import DelBtn from './delBtn';
import { createJsErrorMonitor } from '../../../sdk/createJsErrorMonitor';
import { createResourceErrorMonitor } from '../../../sdk/createResourceErrorMonitor';
import { createPromiseErrorMonitor } from '../../../sdk/createPromiseErrorMonitor';
import { createXhrMonitor } from '../../../sdk/createXhrMonitor';
import { TitleNode , Props , AddData } from '@/types/treeComponents';

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
    const addData:AddData = {key:data.key,pid:data.pid + 1}
    return (
      <div className='InterfaceBlock' onMouseEnter={changeBtnState} onMouseLeave={changeBtnState}>
        <div>
          { data.title }
        </div>
        {
          show && (
            <div className='btn' >
              <AddBtn data={addData}/>
              <DelBtn data={data.key}/>
            </div>
          )
        }
      </div>
    )
}

export default InterfaceBlock;
