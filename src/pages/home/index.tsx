import React, { useState, useEffect } from 'react';
import './index.less';
import { Link } from 'react-router-dom';
import { Counter } from '../../components/Counter.tsx';
import InterfaceBlock from '@/components/InterfaceBlock/index.tsx';
import RenderTree from '@/components/RenderTree/index.tsx';
import { ArrayItem } from '@/types/arrayToTree.ts';

// eval()
const data = [
  { key: 1, title: { key: 1, title: "接口目录1", pid: 0 , type: "file" } , type: "file", pid: 0 },
  { key: 2, title: { key: 2, title: "接口目录2", pid: 1 , type: "file" }, type: "file", pid: 1 },
];

const Home: React.FunctionComponent = () => {
  

  return (
    <div>
      <div>主页</div>
      <div>
        <Link to='/project'>项目1</Link>
      </div>
      <div>
        <Link to='/user'>用户中心</Link>
      </div>
      <div>
        <Counter />
      </div>
      <RenderTree data={data}></RenderTree>
    </div>
  );
};

export default Home;