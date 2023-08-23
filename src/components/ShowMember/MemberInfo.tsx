import React from 'react';
import type { MemberProps } from '@/types/MemberShow';
import "./MemberInfo.less"

const MemberInfo: React.FC<MemberProps> = (props) => {
    return (
        <div className='memberInfo'>
            <h1>
                { props.data.count }
            </h1>
            <p>
                { props.data.label }
            </p>
        </div>
    )
}

export default MemberInfo;