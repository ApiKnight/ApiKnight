import {ArrayItem} from "@/types/arrayToTree";

interface AddData {
    key: number;
    pid: number;
}

interface TitleNode {
    key: number;
    title: string;
    pid: number;
    type: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "PATCH" ;
}

interface Props {
    data:TitleNode;
}

interface MakeValue {
    value: ArrayItem[]
}

export { AddData , Props , TitleNode , MakeValue }
