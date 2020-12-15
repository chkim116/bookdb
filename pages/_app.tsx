import "../styles/globals.css";
import "quill/dist/quill.snow.css";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import Nav from "../components/Layouts/Nav";
import FooterForm from "../components/Layouts/Footer";
import type { AppProps } from "next/app";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";
import Axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import Loader from "../styles/loader";
import { useEffect } from "react";

const AppLayouts = styled.main`
    width: 100%;
    --webkit-font-smoothing: antialiased;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    display: flex;
    flex-direction: column;
`;

Axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
        ? "https://bookdb-b.herokuapp.com/"
        : "http://localhost:4000/";
Axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
    const { isLoading } = useSelector((state: RootState) => state.loading);
    const { token, isLogout } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        if (token) {
            const date = new Date();
            date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
            const expires = `; expires=${date.toUTCString()}`;
            document.cookie = `x_auth=${token} ${expires} ; samesite=none ; httpOnly ; secure`;
        }
    }, [token]);

    useEffect(() => {
        if (isLogout) {
            document.cookie = "x_auth=; Max-Age=0";
        }
    }, [isLogout]);
    return (
        <ThemeProvider theme={theme}>
            {isLoading && <Loader />}
            <Nav />
            <AppLayouts>
                <Component {...pageProps} />
            </AppLayouts>
            <FooterForm />
        </ThemeProvider>
    );
}

export default wrapper.withRedux(withReduxSaga(MyApp));
