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

interface Props {
  data:ArrayItem[]
}

const renderTree: React.FC<Props> = ({data}) => {
  // console.log("data is :",data);
  const tree: TreeNode[] = arrayToTree(data);
  const { DirectoryTree } = Tree;
  // const onLoadData = ({ key, children }: any) =>
  //   new Promise<void>((resolve) => {
  //     if (children) {
  //       resolve();
  //       return;
  //     }
  //     setTimeout(() => {
  //       setTreeData((origin) =>
  //         updateTreeData(origin, key, [
  //           { title: 'Child Node', key: `${key}-0` },
  //           { title: 'Child Node', key: `${key}-1` },
  //         ]),
  //       );

  //       resolve();
  //     }, 1000);
  //   });

  //     const menu = (
//       <div style={tmpStyle}>
//         <div style={{ alignSelf: 'center', marginLeft: 10, display: isHideAdd }} onClick={handleAddSub}>
//           <Tooltip placement="bottom" title="添加子节点">
//             <PlusCircleOutlined />
//           </Tooltip>
//         </div>
//         <div style={{ alignSelf: 'center', marginLeft: 10, display: isHideUpdate }} onClick={handleEditSub}>
//           <Tooltip placement="bottom" title="修改节点">
//             <EditOutlined />
//           </Tooltip>
//         </div>
//         {NodeTreeItem?.category === 1 ? (
//           ''
//         ) : (
//           <div style={{ alignSelf: 'center', marginLeft: 10, display: isHideDelete }} onClick={handleDeleteSub}>
//             <Tooltip placement="bottom" title="删除该节点">
//               <MinusCircleOutlined />
//             </Tooltip>
//           </div>
//         )}
//       </div>
//     );

//     return NodeTreeItem == null ? '' : role === 0 ? menu : '';
//   };

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

// import React, { useState, useRef, useEffect } from 'react';
// import { Tree, Tooltip, Modal, Form, Input, message } from 'antd';
// import { PlusCircleOutlined, EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
// import { reqGetTreeNode, reqAddTreeNode, reqUpdateTreeNode, reqDeleteTreeNode } from '../../api';
// const { DirectoryTree } = Tree;

// interface TreeNodeItem {
//   title: string;
//   key: string;
//   children?: TreeNodeItem[];
//   isLeaf?: boolean;
// }

// interface NodeTreeItem {
//   pageX: number;
//   pageY: number;
//   key: string;
//   name: string;
//   pos: number;
// }

// const renderTree: React.FC = () => {
//   const formRef = useRef<FormInstance>(null);
//   const [role, setRole] = useState<number>(0);
//   const [treeData, setTreeData] = useState<TreeNodeItem[]>([]);
//   const [defaultExpandedKeys, setDefaultExpandedKeys] = useState<string>('');
//   const [NodeTreeItem, setNodeTreeItem] = useState<NodeTreeItem | null>(null);
//   const [visible, setVisible] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isHideAdd, setIsHideAdd] = useState('');
//   const [isHideUpdate, setIsHideUpdate] = useState('');
//   const [isHideDelete, setIsHideDelete] = useState('');
//   const [operType, setOperType] = useState('');
//   const [text, setText] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     getTreeNode();
//   }, []);

//   const addIsLeaf = (treenode: TreeNodeItem[]) => {
//     treenode.forEach((item) => {
//       if (item.children && item.children.length === 0) {
//         item.isLeaf = true;
//       } else {
//         addIsLeaf(item.children || []);
//       }
//     });
//   };

//   const getTreeNode = async () => {
//     const result = await reqGetTreeNode();
//     addIsLeaf(result.value);
//     setTreeData([
//       {
//         title: '信息管理',
//         key: '1',
//         children: [...result.value],
//       },
//     ]);
//     setDefaultExpandedKeys(result.value[0].key);
//     setIsLoading(false);
//   };

//   const onSelect = async (keys: string[], info: any) => {
//     setNodeTreeItem(null);
//     const { key, pos } = info.node;
//     // Logic for handling tree node selection
//   };

//   const onRightClick = ({ event, node }: any) => {
//     const x = -75;
//     const y = event.clientY - 112;
//     const pos = node.pos.split('-').length - 1;
//     if (pos === 1) {
//       setNodeTreeItem({
//         pageX: x,
//         pageY: y,
//         key: node.key,
//         name: node.title,
//         pos,
//       });
//       setIsHideUpdate('none');
//       setIsHideDelete('none');
//     } else if (pos === 3) {
//       setNodeTreeItem({
//         pageX: x,
//         pageY: y,
//         key: node.key,
//         name: node.title,
//         pos,
//       });
//       setIsHideAdd('none');
//     } else {
//       setNodeTreeItem({
//         pageX: x,
//         pageY: y,
//         key: node.key,
//         name: node.title,
//         pos,
//       });
//       setIsHideAdd('');
//       setIsHideUpdate('');
//       setIsHideDelete('');
//     }
//   };

//   const getNodeTreeMenu = () => {
//     const { pageX, pageY } = NodeTreeItem || {};
//     const tmpStyle: React.CSSProperties = {
//       position: 'absolute',
//       maxHeight: 40,
//       textAlign: 'center',
//       left: `${pageX}px`,
//       top: `${pageY}px`,
//       display: 'flex',
//       flexDirection: 'row',
//     };

//     const menu = (
//       <div style={tmpStyle}>
//         <div style={{ alignSelf: 'center', marginLeft: 10, display: isHideAdd }} onClick={handleAddSub}>
//           <Tooltip placement="bottom" title="添加子节点">
//             <PlusCircleOutlined />
//           </Tooltip>
//         </div>
//         <div style={{ alignSelf: 'center', marginLeft: 10, display: isHideUpdate }} onClick={handleEditSub}>
//           <Tooltip placement="bottom" title="修改节点">
//             <EditOutlined />
//           </Tooltip>
//         </div>
//         {NodeTreeItem?.category === 1 ? (
//           ''
//         ) : (
//           <div style={{ alignSelf: 'center', marginLeft: 10, display: isHideDelete }} onClick={handleDeleteSub}>
//             <Tooltip placement="bottom" title="删除该节点">
//               <MinusCircleOutlined />
//             </Tooltip>
//           </div>
//         )}
//       </div>
//     );

//     return NodeTreeItem == null ? '' : role === 0 ? menu : '';
//   };

//   const handleAddSub = () => {
//     setIsModalVisible(true);
//     setOperType('add');
//   };

//   const handleEditSub = () => {
//     const { NodeTreeItem } = NodeTreeItem || {};
//     setIsModalVisible(true);
//     setOperType('update');
//     formRef.current?.setFieldsValue({ name: NodeTreeItem?.name });
//   };

//   const handleDeleteSub = () => {
//     setIsModalVisible(true);
//     setOperType('delete');
//   };

//   const toAdd = async (values: any) => {
//     const { NodeTreeItem } = NodeTreeItem || {};
//     const result = await reqAddTreeNode(values.name, NodeTreeItem?.key);
//     if (result.msg === 'success') {
//       message.success('节点添加成功');
//     } else {
//       message.error('节点添加失败，请重试');
//     }
//     setIsModalVisible(false);
//     getTreeNode();
//   };

//   const toUpdate = async (values: any) => {
//     const { NodeTreeItem } = NodeTreeItem || {};
//     const result = await reqUpdateTreeNode(NodeTreeItem?.key, values.name, NodeTreeItem?.pos);
//     if (result.msg === 'success') {
//       message.success('节点修改成功');
//     } else {
//       message.error('节点修改失败，请重试');
//     }
//     setIsModalVisible(false);
//     getTreeNode();
//   };

//   const toDelete = async () => {
//     const { NodeTreeItem } = NodeTreeItem || {};
//     const result = await reqDeleteTreeNode(NodeTreeItem?.key, NodeTreeItem?.pos);
//     if (result.msg === 'success') {
//       message.success('节点删除成功');
//     } else {
//       message.error('节点删除失败，请重试');
//     }
//     setIsModalVisible(false);
//     setNodeTreeItem(null);
//     getTreeNode();
//   };

//   const handleOk = () => {
//     const { operType } = operType;
//     formRef.current?.validateFields().then((values:any) => {
//       if (operType === 'add') {
//         toAdd(values);
//       } else if (operType === 'update') {
//         toUpdate(values);
//       } else {
//         toDelete();
//       }
//     }).catch((reason:any) => {
//       message.warning('表单输入不允许为空，请检查');
//     });
//   };

//   const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
//     formRef.current?.resetFields();
//     setIsModalVisible(false);
//   };

//   if (isLoading) {
//     return null;
//   } else {
//     return (
//       <>
//         <div style={{ display: 'flex', marginRight: '20px' }}>
//           <DirectoryTree
//             multiple
//             defaultExpandAll
//             onSelect={onSelect}
//             treeData={treeData}
//             onRightClick={onRightClick}
//             style={{ width: '250px' }}
//           />
//           <div style={{ position: 'relative' }}>{NodeTreeItem != null ? getNodeTreeMenu() : ''}</div>
//         </div>

//         <Modal
//           title={operType === 'add' ? '添加节点' : operType === 'delete' ? '删除节点' : '修改节点'}
//           visible={isModalVisible}
//           onOk={handleOk}
//           okText="确定"
//           onCancel={handleCancel}
//           cancelText="取消"
//           forceRender={true}
//         >
//           {operType === 'add' ? '请输入要添加节点的名称' : operType === 'delete' ? '您确定要删除该节点吗？' : '请输入要修改节点的名称'}
//           <Form name="normal" ref={formRef} style={{ display: operType === 'delete' ? 'none' : '' }}>
//             <Form.Item
//               name="name"
//               rules={[
//                 { required: operType === 'delete' ? false : true, message: '节点名称不允许为空' },
//               ]}
//             >
//               <Input placeholder="请输入节点名称" />
//             </Form.Item>
//           </Form>
//         </Modal>
//       </>
//     );
//   }
// };

// export default renderTree;
