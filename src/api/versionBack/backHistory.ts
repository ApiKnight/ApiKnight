import request from "@/api/request";

/**
 * 根据target版本id回退版本
 * @param target 版本id
 * @returns message信息
 */

async function backHistory(target:string):Promise<string> {
    const resp = await request.post("/v1/apis/back",{
        version_id: target
    },{})
    return resp.data.message
}

export { backHistory }