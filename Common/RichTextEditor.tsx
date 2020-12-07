import React, { useEffect, useRef } from "react";
import "../node_modules/quill/dist/quill.snow.css";

import styled from "@emotion/styled";
import Quill, { RangeStatic } from "quill";
import Axios from "axios";

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
            const onClickImg = () => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();

                input.onchange = async () => {
                    const file = input.files[0];
                    const formData = new FormData();
                    formData.append("image", file);

                    // 현재 커서 위치 저장
                    const range = quill.getSelection(true);
                    // 현재 위치에 이미지 놓기
                    quill.insertEmbed(
                        range.index,
                        "image",
                        "https://bookthumb-phinf.pstatic.net/cover/163/634/16363411.jpg?type=m1&udate=20200603"
                    );
                    // 다음 위치에 커서 옮기기
                    quill.setSelection(range.index + 1);

                    // 이미지 api
                    const postImg = () => {
                        return Axios.post("/review/img", formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }).then((res) => res.data);
                    };
                    // 등록된 이미지 삭제
                    quill.deleteText(range.index, 1);

                    // api로 받아온 이미지 추가
                    const img = await postImg();
                    quill.insertEmbed(range.index, "image", img);

                    // 다음 위치에 커서 옮기기
                    quill.setSelection(range.index + 1);
                };
            };

            const quill: Quill = quillInstance.current;
            quill.on("text-change", (delta, oldDelta, source) => {
                if (source === "user") {
                    quill.root.innerHTML;
                }
            });
            quill.getModule("toolbar").addHandler("image", onClickImg);
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
