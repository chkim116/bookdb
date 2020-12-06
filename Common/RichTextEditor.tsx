import React, { useEffect, useRef } from "react";
import "../node_modules/quill/dist/quill.snow.css";

import styled from "@emotion/styled";

const QuillContainer = styled.div`
    width: 100%;
    margin-top: 12px;

    .ql-toolbar {
        border: 3px solid ${(props) => props.theme.border};
    }
    .ql-container {
        border: 3px solid ${(props) => props.theme.border};
        min-height: 500px;
    }
`;

export const RichTextEditor = () => {
    const Quill = typeof window === "object" ? require("quill") : () => false;
    const quillElement = useRef();
    const quillInstance = useRef();

    const modules: any = {
        toolbar: {
            container: [
                [{ font: [] }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3] }],
                [{ color: [] }, { background: [] }],
                ["bold", "italic", "strike", "blockquote"],
                [{ align: [] }],
                ["link"],
                ["image"],
            ],
        },
    };

    const formats = [
        "font",
        "size",
        "bold",
        "italic",
        "background",
        "color",
        "blockquote",
        "header",
        "strike",
        "underline",
        "align",
        "direction",
        "link",
        "image",
    ];

    useEffect(() => {
        if (quillElement.current || Quill) {
            quillInstance.current = new Quill(quillElement.current, {
                theme: "snow",
                modules,
                formats,
            });
        }
    }, []);

    return (
        <QuillContainer>
            <div ref={quillElement}>
                <div ref={quillInstance}></div>
            </div>
        </QuillContainer>
    );
};
