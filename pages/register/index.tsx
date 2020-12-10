import { useFormInput } from "@cooksmelon/event";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Register from "../../components/register/Register";
import { RootState } from "../../redux";
import { registerRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/loading";
import { Container } from "../../styles/CommonStyle";

const index = () => {
    const router = useRouter();
    const [form, onChange] = useFormInput();
    const dispatch = useDispatch();
    const { isRegister, isRegisterErr } = useSelector(
        (state: RootState) => state.auth
    );

    const onRegister = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loadRequest());
            dispatch(registerRequest(form));
        },
        [form, dispatch]
    );

    useEffect(() => {
        if (isRegister) {
            router.push("/");
        }
    }, [isRegister, router]);

    useEffect(() => {
        if (isRegisterErr) {
            alert(`회원가입 에러 ${isRegisterErr}`);
        }
    }, [isRegisterErr]);

    return (
        <Container>
            <Register onRegister={onRegister} onChange={onChange}></Register>
        </Container>
    );
};

export default index;
