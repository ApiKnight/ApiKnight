interface AddData {
    key: number;
    pid: number
}

interface TitleNode {
    key: number;
    title: string;
    pid: number
}

interface Props {
    data:TitleNode;
}

interface MakeValue {
    value: ArrayItem[]
}

export { AddData , Props , TitleNode , MakeValue }