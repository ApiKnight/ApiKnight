import React, {useEffect, useState} from 'react'
import Tabs from '@/components/Tabs'
import RightComponent from '@/components/RightComponent'
import {RootState} from "../../store";
import {useSelector} from "react-redux";

const RightPage: React.FunctionComponent = () => {
    const rightSlice = useSelector((state: RootState) => state.rightSlice.value)
    useEffect(()=>{
        console.log(rightSlice)
    },[rightSlice])
    return (
        <div>
          <Tabs />
          <RightComponent />
        </div>
      )
}

export default RightPage
