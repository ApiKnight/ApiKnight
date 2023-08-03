// import React from "react";
// import { arrayToTree } from "../../utils/arrayToTree";
// import InterfaceBlock from "../interfaceBlock/interfaceBlock";
// import type { Tree, ArrayItem } from "../../utils/arrayToTree";

// interface Props {
//   data: ArrayItem[];
// }

// const RenderTree: React.FunctionComponent<Props> = ({ data }) => {
//   const tree: Tree[] = arrayToTree(data);

//   const renderChildren = (children: Tree[] | undefined) => {
//     if (children && children.length > 0) {
//       return (
//         <div>
//           {children.map((child:Tree) => (
//             <div key={child.id}>
//               <InterfaceBlock data={child} />
//               {renderChildren(child.children)}
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return <div>{renderChildren(tree)}</div>;
// };

// export default RenderTree;

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

const renderTree: React.FC<Props> = ({data}) => {
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