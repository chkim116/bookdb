import { useFormInput } from "@cooksmelon/event";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../components/login/Login";
import { Seo } from "../../head/Seo";
import { RootState } from "../../redux";
import { loginRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/loading";
import { Container } from "../../styles/CommonStyle";

const index = () => {
    const router = useRouter();
    const [form, onChange] = useFormInput();
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
            dispatch(loadRequest());
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

export default index;
