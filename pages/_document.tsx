import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="google-site-verification"
                        content="LSMSBh3qpVZWSStPceEK1wn6UWjnXD8jzfmz7TVvQbE"
                    />
                </Head>
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
