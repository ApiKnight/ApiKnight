import React, {useEffect, useState} from 'react'
import Tabs from '@/components/Tabs'
import RightComponent from '@/components/RightComponent'
import {RootState} from "../../store";
import {useSelector} from "react-redux";
import {Button} from "antd";

const RightPage: React.FunctionComponent = () => {
    return (
        <div>
          <Tabs />
          <RightComponent />
        </div>
      )
}

export default RightPage
