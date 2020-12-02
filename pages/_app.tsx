import "../styles/globals.css";
import "antd/dist/antd.css";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import theme from "../styles/theme";
import Nav from "../components/Layouts/Nav";
import FooterForm from "../components/Layouts/Footer";
import type { AppProps } from "next/app";

const AppLayouts = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: ${(props) => props.theme.maxWidth};
    display: flex;
    flex-direction: column;
`;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Nav />
            <AppLayouts>
                <Component {...pageProps} />
            </AppLayouts>
            <FooterForm />
        </ThemeProvider>
    );
}

export default MyApp;
