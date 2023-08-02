import React from 'react';
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
    const {data} = props; 
    return (
      <div className='InterfaceBlock'>
        <div>
          { data.title }
        </div>
        <div className='btn'>
          <AddBtn/>
          <DelBtn/>
        </div>
      </div>
    )
}

export default InterfaceBlock;
