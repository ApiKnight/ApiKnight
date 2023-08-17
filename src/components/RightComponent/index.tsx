import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";

const RightComponent: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const rightSlice = useSelector((state: RootState) => state.rightSlice.value)
    return (
        <div>
            <div>
                {
                    rightSlice === "" && <div>新建xx(默认页面)</div>
                }
            </div>
            {/* 下面的div里加入右边组件。 rightSlice就是我要传的  id */}
            <div>
                {rightSlice}
            </div>
        </div>
    )
}

export default RightComponent;
