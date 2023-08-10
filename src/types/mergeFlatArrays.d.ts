interface FlatItem {
    id: string;
    parent_id: string | null;
    project_id: number;
    name: string;
    type?: null | 'GET'
        | 'POST'
        | 'PUT'
        | 'DELETE'
        | 'OPTIONS'
        | 'HEAD'
        | 'PATCH'
        | 'FILE'
}
interface FlatItemValue {
    value_1:FlatItem[];
    value_2:FlatItem[];
    target: number | null;
}
interface InitValue {
    value: FlatItemValue
}
export type { FlatItem , FlatItemValue , InitValue }
