import { useFormInput } from "@cooksmelon/event";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import Login from "../../components/login/Login";
import { Seo } from "../../head/Seo";
import { RootState } from "../../redux";
import { authRequest, loginRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/loading";
import wrapper from "../../store/configureStore";
import { Container } from "../../styles/CommonStyle";

const index = () => {
    const router = useRouter();
    const [form, onChange] = useFormInput();
    const dispatch = useDispatch();
    const { isLogin, isLoginErr, token, isLogout } = useSelector(
        (state: RootState) => state.auth
    );

    const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

    useEffect(() => {
        if (token) {
            setCookie("x_auth", token, {
                maxAge: 7 * 24 * 60 * 60,
            });
        }
        console.log(token, cookies);
    }, [token]);

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
            alert(`로그인 에러, 다시 시도해주세요`);
        }
    }, [isLoginErr]);

    const data = {
        title: `로그인`,
        description: "로그인 페이지, BookDB",
        canonical: `${router.asPath}`,
    };

    return (
        <Container>
            <Seo data={data} />
            <Login onLogin={onLogin} onChange={onChange}></Login>;
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
