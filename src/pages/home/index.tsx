import React, { useState, useEffect } from 'react';
import './index.less';
import { Link } from 'react-router-dom';
import { Counter } from '../../components/Counter.tsx';
import { useSelector, useDispatch } from 'react-redux';
import InterfaceBlock from '@/components/InterfaceBlock/index.tsx';
import RenderTree from '@/components/RenderTree/index.tsx';
import { ArrayItem } from '@/types/arrayToTree.ts';
import { assign } from '@/store/modules/dirArraySlice.ts';
import { RootState } from '@/store/index.ts';

interface MakeValue {
  value: ArrayItem[];
}

const data = [
  { key: 1, title: <InterfaceBlock data={{ id: 1, title: "接口目录1", pid: 0 }} />, type: "file", pid: 0 },
  { key: 2, title: <InterfaceBlock data={{ id: 2, title: "接口目录2", pid: 1 }} />, type: "file", pid: 1 },
];

const Home: React.FunctionComponent = () => {
  const [makeValue, setMakeValue] = useState<MakeValue>({ value: data });
  const dispatch = useDispatch();
  const dirArray = useSelector((state: RootState) => state.dirArray.value);

  useEffect(() => {
    dispatch(assign(data));
  }, []);

  useEffect(() => {
    setMakeValue({ value: dirArray });
  }, [dirArray]);

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
      <RenderTree data={makeValue.value}></RenderTree>
    </div>
  );
};

export default Home;