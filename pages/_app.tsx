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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import Loader from "../styles/loader";
import { useEffect } from "react";
import { authRequest } from "../redux/auth";
import { useRouter } from "next/dist/client/router";

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
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (process.browser) {
            const cookie = document.cookie;
            Axios.defaults.headers.Cookie = "";
            Axios.defaults.headers.withCredentials = true;
            if (cookie) {
                Axios.defaults.headers.Cookie = cookie;
                dispatch(authRequest());
            }
            console.log("login");
        }
    }, [router.query]);

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
