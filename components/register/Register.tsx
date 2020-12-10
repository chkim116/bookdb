import React from "react";
import { onSubmit, onFormChange } from "../../@types/types";
import UserSignForm from "../Common/UserSignForm";

type Props = {
    onRegister: onSubmit;
    onChange: onFormChange;
};

const Register = ({ onRegister, onChange }: Props) => {
    return (
        <UserSignForm
            register={true}
            onRegister={onRegister}
            onChange={onChange}></UserSignForm>
    );
};

export default Register;
