import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import Email from "@/components/Invite/email";
import "./index.less"
import Title from "@/components/Invite/title";

const Invite: React.FunctionComponent = () => {
    return ReactDOM.createPortal(
        <div className="invite-modal">
            <Title/>
            <Email/>
        </div>,
        document.body
    );
}

export default Invite;
