import { useFormInput } from "@cooksmelon/event";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../components/login/Login";
import { RootState } from "../../redux";
import { loginRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/loading";
import { Container } from "../../styles/CommonStyle";

const index = () => {
    const router = useRouter();
    const [form, onChange, setForm] = useFormInput();
    const dispatch = useDispatch();
    const { isLogin, isLoginErr } = useSelector(
        (state: RootState) => state.auth
    );

    const onLogin = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loginRequest(form));
            dispatch(loadRequest());
        },
        [form, dispatch]
    );

    useEffect(() => {
        if (isLogin) {
            router.push("/");
        }
    }, [isLogin, router]);

    useEffect(() => {
        if (isLoginErr) {
            alert(`로그인 에러 ${isLoginErr}`);
        }
    }, [isLoginErr]);

    return (
        <Container>
            <Login onLogin={onLogin} onChange={onChange}></Login>;
        </Container>
    );
};

export default index;
