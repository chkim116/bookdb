import "../styles/globals.css";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import Nav from "../components/Layouts/Nav";
import FooterForm from "../components/Layouts/Footer";
import type { AppProps } from "next/app";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/dist/client/router";

import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";

const AppLayouts = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: ${(props) => props.theme.maxWidth};
    display: flex;
    flex-direction: column;
`;

function MyApp({ Component, pageProps }: AppProps) {
    const [searchText, setSearchText] = useState<string>("");
    const router = useRouter();
    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => {
            const { value } = e.target;
            setSearchText(value);
        },
        [searchText]
    );

    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            router.push(`/search?query=${searchText}`);
            setSearchText("");
        },
        [searchText]
    );

    return (
        <ThemeProvider theme={theme}>
            <Nav
                onChange={onChange}
                onSubmit={onSubmit}
                searchText={searchText}
            />
            <AppLayouts>
                <Component {...pageProps} />
            </AppLayouts>
            <FooterForm />
        </ThemeProvider>
    );
}

export default wrapper.withRedux(withReduxSaga(MyApp));
