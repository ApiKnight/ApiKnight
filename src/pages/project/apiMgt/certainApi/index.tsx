import React, { useState, useEffect } from 'react';
import './index.less'
import { assign } from '@/store/modules/dirArraySlice.ts';
import { RootState } from '@/store/index.ts';
import { useSelector, useDispatch } from 'react-redux';
import InterfaceBlock from '@/components/interfaceBlock/interfaceBlock.tsx';
import RenderTree from '@/components/renderTree/renderTree.tsx';
import { ArrayItem } from '@/utils/arrayToTree.ts';
import { Outlet, Link } from 'react-router-dom'

interface MakeValue {
  value: ArrayItem[];
}
const data = [
  { key: 1, title: <InterfaceBlock data={{ id: 1, title: "接口目录1", pid: 0 }} />, type: "file", pid: 0 },
  { key: 2, title: <InterfaceBlock data={{ id: 2, title: "接口目录2", pid: 1 }} />, type: "file", pid: 1 },
];

const CertainApi: React.FunctionComponent = () => {
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
    <>
      <div>CertainApi</div>
      <RenderTree data={makeValue.value}></RenderTree>
      <ul>
        <li>
          <Link to='/project/apiMgt/certainApi/document'>document</Link>
        </li>
        <li>
          <Link to='/project/apiMgt/certainApi/test'>test</Link>
        </li>
        <li>
          <Link to='/project/apiMgt/certainApi/mock'>mock</Link>
        </li>
      </ul>
      <Outlet />
    </>
  )
}

export default CertainApi
