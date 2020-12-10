import React from "react";
import { onFormChange, onSubmit } from "../../@types/types";
import UserSignForm from "../Common/UserSignForm";

type Props = {
    onLogin: onSubmit;
    onChange: onFormChange;
};

const Login = ({ onLogin, onChange }: Props) => {
    return (
        <UserSignForm register={false} onChange={onChange} onLogin={onLogin} />
    );
};

export default Login;
