import { useFormInput } from "@cooksmelon/event";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import Register from "../../components/register/Register";
import { RootState } from "../../redux";
import { authRequest, registerRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/loading";
import wrapper from "../../store/configureStore";
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
            alert(`회원가입 에러, 새로고침 후 시도해주세요`);
        }
    }, [isRegisterErr]);

    return (
        <Container>
            <Register onRegister={onRegister} onChange={onChange}></Register>
        </Container>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const { store } = ctx;

    const cookie = ctx.req?.headers?.cookie;
    Axios.defaults.headers.Cookie = "";

    if (ctx.req && cookie) {
        Axios.defaults.headers.Cookie = cookie;
        store.dispatch(authRequest());
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }
});

export default index;
