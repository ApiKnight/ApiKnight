import React, { useState } from 'react';
import "./index.less";
import AddBtn from './addBtn';
import DelBtn from './delBtn';
import { createJsErrorMonitor } from '../../../sdk/createJsErrorMonitor';

interface TitleNode {
    id: number;
    title: string;
}

interface Props {
    data:TitleNode;
}

const InterfaceBlock: React.FunctionComponent<{data:TitleNode}> = (props:Props) => {
    createJsErrorMonitor('interfaceBlock').start();
    const [show,setShowState] = useState(false)
    function changeBtnState():void {
      setShowState(!show);
      console.log(show);
    }
    const {data} = props; 
    return (
      <div className='InterfaceBlock' onMouseEnter={changeBtnState} onMouseLeave={changeBtnState}>
        <div>
          { data.title }
        </div>
        {
          show && (
            <div className='btn'>
              <AddBtn/>
              <DelBtn/>
            </div>
          )
        }
      </div>
    )
}

export default InterfaceBlock;
