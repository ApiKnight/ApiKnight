import { ArrayItem, ArrayItemType } from '@/types/arrayToTree'
import { FlatItem } from '@/types/mergeFlatArrays'
import { parseAPIInfo } from './api/api'

interface NewItemType {
  key: string
  title: string | NewItemType
  pid: string | null
  type: ArrayItemType
}
// arr_1 -> 文件目录数组 arr_2 -> 接口文件数组
export function mergeFlatArrays(
  arr_1: FlatItem[],
  arr_2: FlatItem[],
  targetId: number | null,
): ArrayItem[] {
  const realArray_1 = arr_1.filter((item: FlatItem) => {
    return item.project_id === targetId
  })
  const realArray_2 = arr_2.filter((item: FlatItem) => {
    return item.project_id === targetId
  })
  realArray_1.map((item: FlatItem) => {
    item.type = 'FILE'
  })
  realArray_2.map((item: FlatItem) => {
    try {
      const tempData = parseAPIInfo(item.request_data)
      item.type = tempData.getMethod()
    } catch (error) {
      console.log(error)
    }
  })
  realArray_2.map((item) => {
    item.parent_id = item.folder_id
  })
  const newArray = [...realArray_2, ...realArray_1]
  const mergeArray: Array<NewItemType> = []
  newArray.map((item: FlatItem) => {
    const newItem: NewItemType = {
      key: item.id,
      title: item.name,
      pid: item.parent_id,
      type: item.type,
    }
    mergeArray.push(newItem)
  })
  const arr: Array<NewItemType> = mergeArray
  arr.map((e: NewItemType) => {
    e.title = { key: e.key, title: e.title, pid: e.pid, type: e.type }
  })
  const result: Array<ArrayItem> = arr
  return result
}
