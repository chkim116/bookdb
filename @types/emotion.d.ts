import "@emotion/react";

declare module "@emotion/react" {
    export interface Theme {
        maxWidth: string;
        white: string;
        black: string;
        gray: string;
        blue: string;
        sky: string;
        border: string;
        yellow: string;
        darkYellow: string;
        darkWhite: string;
        shadow: string;
        boxShadow: string;
        ss: string;
        ms: string;
        ls: string;
        xls: string;
    }
}

// You are also able to use a 3rd party theme this way:
