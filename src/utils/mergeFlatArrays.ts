import {ArrayItem, FlatArrayItem} from "@/types/arrayToTree";
import {FlatItem} from "@/types/mergeFlatArrays";

// arr_1 -> 文件目录数组 arr_2 -> 接口文件数组
export function mergeFlatArrays(arr_1:FlatItem[],arr_2:FlatItem[],targetId:number | null):ArrayItem[] {
    let realArray_1 = arr_1.filter((item:FlatItem)=>{
        return item.project_id === targetId;
    });
    let realArray_2 = arr_2.filter((item:FlatItem)=>{
        return item.project_id === targetId;
    });
    realArray_1.map((item)=>{
        item.type = "FILE";
    })
    realArray_2.map((item)=>(
        item.type = "GET"
    ))
    const newArray = [...realArray_2,...realArray_1];
    let mergeArray:any = [];
    newArray.map((item:FlatItem)=>{
        const newItem = {
            key: item.id,
            title: item.name,
            pid: item.parent_id,
            type: item.type
        }
        mergeArray.push(newItem);
    })
    let arr:any = mergeArray;
    arr.map((e)=>{
        e.title = { key: e.key, title: e.title, pid: e.pid, type: e.type };
    })
    let result:ArrayItem[] = arr;
    return result;
}
