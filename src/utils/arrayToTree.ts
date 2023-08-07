import { ArrayNode } from "@/types/arrayToTree";
/*
    包含了数组类型转树形结构的函数方法及数据结构
*/


  function arrayToTree(data:ArrayNode[]) {
      const root = {};

      // 创建一个空对象用于存储每个节点的引用
      const nodes = {};

      // 遍历数据，将每个节点添加到nodes对象中
      data.forEach(node => {
          nodes[node.key] = {
              key: node.key,
              title: node.title,
              type: node.type,
              children: []
          };
      });

      // 遍历数据，构建树形结构
      data.forEach(node => {
          const parentId = node.pid;
          const key = node.key;

          // 如果父节点id为0，则将当前节点添加到根节点下
          if (parentId === 0) {
              root[key] = nodes[key];
          } else {
              // 否则将当前节点添加到对应父节点的children数组中
              nodes[parentId].children.push(nodes[key]);
          }
      });

      // 返回根节点数组
      return Object.values(root);
}


export {arrayToTree};
