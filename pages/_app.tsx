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
import { useCookies } from "react-cookie";

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

    const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);

    useEffect(() => {
        if (token) {
            setCookie("x_auth", token, {
                maxAge: 7 * 24 * 60 * 60,
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                domain: "bookdb-jdjk9yuaz.vercel.app",
                path: "/",
            });
        }
        console.log(token, cookies);
    }, [token]);

    useEffect(() => {
        if (isLogout) {
            removeCookie("x_auth", {
                maxAge: 7 * 24 * 60 * 60,
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
            });
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
