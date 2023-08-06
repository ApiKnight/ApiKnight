import { ArrayItem } from "@/types/arrayToTree";
/* 
    包含了数组类型转树形结构的函数方法及数据结构
*/

  
  function arrayToTree(items:ArrayItem[]) {
    const res:any = [] // 存放结果集
    const map:any = {}
    // 判断对象是否有某个属性
    const getHasOwnProperty:any = (obj:any, property:any) => Object.prototype.hasOwnProperty.call(obj, property)

    // 边做map存储，边找对应关系
    for (const i of items) {
        map[i.key] = {
            ...i,
            children: getHasOwnProperty(map, i.key) ? map[i.key].children : []
        }
        const newItem = map[i.key]
        if (i.pid === 0) {
            res.push(newItem)
        } else {
            if (!getHasOwnProperty(map, i.pid)) {
                map[i.pid] = {
                    children: []
                }
            }
            map[i.pid].children.push(newItem)
        }
    }
    return res
}


export {arrayToTree};