import { VersionInfo } from "@/types/versionInfo";
import request from "@/api/request";

async function getVersionInfo(apis_id: string): Promise<VersionInfo[]> {
    const resp = await request.post("/v1/apis/queryversion", {
        "apis_id": apis_id
    }, {});
    let returnData: Array<VersionInfo> = [];
    resp.data.data.map((item) => {
        returnData.push({
            id: item.id,
            notes: item.notes
        });
    });
    return returnData;
}

export { getVersionInfo };