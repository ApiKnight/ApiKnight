import React , { useEffect , useState } from 'react';
import { Timeline, TimelineItemProps } from 'antd';
import "./index.less"
import { getVersionInfo } from '@/api/versionBack/queryVersion';
import { VersionInfo } from '@/types/versionInfo';

const VersionBack: React.FC<{apis_id: string}> = (props) => {
    let Items: VersionInfo[]
    const [renderItem,setRenderItem] = useState<TimelineItemProps[]>([])
    useEffect(()=>{
        getVersionInfo(props.apis_id).then((returnData)=>{
            Items = returnData
            let temp:TimelineItemProps[] = []
            Items.map((it)=>{
                temp.push({
                    children: it.notes
                })
            })
            setRenderItem(temp)
        })
    },[props.apis_id])
    return (
        <div className='versionBack'>
            <Timeline
                items={renderItem}
            />
        </div>
    )
}

export default VersionBack;