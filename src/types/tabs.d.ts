interface TabsSetItem {
    key: string
    title: string
    type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'
}

interface Props {
    data: TabsSetItem
}

export type { TabsSetItem , Props }
