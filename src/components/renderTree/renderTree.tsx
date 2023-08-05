import React from 'react';
import { Tree } from 'antd';
import { arrayToTree } from "../../utils/arrayToTree";
import type { TreeNode, ArrayItem } from "../../utils/arrayToTree";
import "./index.less";
// 导入监控
import { createJsErrorMonitor } from '../../../sdk/createJsErrorMonitor';
import { createResourceErrorMonitor } from '../../../sdk/createResourceErrorMonitor';
import { createPromiseErrorMonitor } from '../../../sdk/createPromiseErrorMonitor';
import { createXhrMonitor } from '../../../sdk/createXhrMonitor';

interface Props {
  data:ArrayItem[]
}

function startMonitor() {
  createJsErrorMonitor('renderTree').start();
  createResourceErrorMonitor('renderTree').start();
  createPromiseErrorMonitor('renderTree').start();
  createXhrMonitor('renderTree').start();
}

interface MakeValue {
  value: ArrayItem[]
}

const renderTree: React.FC<Props> = ({data}) => {
  // 数组转树形结构
  const tree: TreeNode[] = arrayToTree(data);  
  const { DirectoryTree } = Tree;
  startMonitor();
  return <DirectoryTree
   multiple 
   treeData={tree} 
   defaultExpandAll
    // onSelect={onSelect}
    // onRightClick={onRightClick}
   style={{ width: '270px' }}
   >
    
  </DirectoryTree>;
};

export default renderTree;
