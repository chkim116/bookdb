import { useFormInput } from "@cooksmelon/event";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import Register from "../../components/register/Register";
import { Seo } from "../../head/Seo";
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
            alert(`회원가입 에러, 다시 시도해주세요`);
        }
    }, [isRegisterErr]);

    const data = {
        title: `회원가입`,
        description: "회원가입 페이지, BookDB",
        canonical: `${router.asPath}`,
    };

    return (
        <Container>
            <Seo data={data} />
            <Register onRegister={onRegister} onChange={onChange}></Register>
        </Container>
    );
};

export default index;
