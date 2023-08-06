interface AddData {
    id: number;
    pid: number
}

interface TitleNode {
    id: number;
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