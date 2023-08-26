import request from "@/api/request";
import { increment } from "@/store/modules/watchDir";
import { useDispatch } from "react-redux";

/**
 * 根据target版本id回退版本
 * @param target 版本id
 * @returns message信息
 */

async function backHistory(target:string):Promise<string> {
    const dispatch = useDispatch()
    const resp = await request.post("/v1/apis/back",{
        version_id: target
    },{})
    if (resp.data.code === 200) {
        dispatch(increment())
    }
    return resp.data.message
}

export { backHistory }