import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head></Head>
                <body>
                    <div id="root">
                        <Main />
                        <NextScript />
                    </div>
                </body>
            </Html>
        );
    }
}
