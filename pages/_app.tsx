import "../styles/globals.css";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import Nav from "../components/Layouts/Nav";
import FooterForm from "../components/Layouts/Footer";
import type { AppProps } from "next/app";

import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import Loader from "../styles/loader";
import { authRequest } from "../redux/auth";
import { useEffect } from "react";

const AppLayouts = styled.main`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

Axios.defaults.baseURL = "http://localhost:4000/";

function MyApp({ Component, pageProps }: AppProps) {
    const { isLoading } = useSelector((state: RootState) => state.loading);
    const { isLogin, isAuth } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuth) {
            dispatch(authRequest());
        }
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            {isLoading && <Loader />}
            <Nav isLogin={isLogin} />
            <AppLayouts>
                <Component {...pageProps} />
            </AppLayouts>
            <FooterForm />
        </ThemeProvider>
    );
}

export default wrapper.withRedux(withReduxSaga(MyApp));
