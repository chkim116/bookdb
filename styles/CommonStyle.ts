import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { prependOnceListener } from "process";

type InputType = {
    width?: string;
    height?: string;
};

type ButtonType = {
    width?: string;
    height?: string;
    color?: string;
    bg?: string;
    hover?: boolean;
    hoverbg?: string;
    hoverColor?: string;
    border?: string;
    radius?: boolean;
};

type ContainerType = {
    color?: string;
};

type TitleType = {
    align?: string;
};

export const Container = styled.div<ContainerType>`
    width: 100%;
    background: ${(props) => (props.color ? props.color : "#f8f8f8")};
`;

export const Input = styled.input<InputType>`
    border: 3px solid ${(props) => props.theme.border};
    padding: 6px 12px;
    width: ${(props) => props.width && props.width};
    height: ${(props) => props.height && props.height};
`;

export const Button = styled.button<ButtonType>`
    width: ${(props) => (props.width ? props.width : "100px")};
    height: ${(props) => (props.height ? props.height : "30px")};
    text-align: center;
    padding: 4px 12px;
    font-size: ${(props) => props.theme.ms};
    background: ${(props) => (props.bg ? props.bg : props.theme.yellow)};
    color: ${(props) => (props.color ? props.color : props.theme.black)};
    font-weight: 700;
    border-radius: ${(props) => props.radius && "8px"};
    border: ${(props) => props.border};

    &:hover {
        background: ${(props) => props.hover && props.theme.shadow};
        transition: ${(props) => props.hover && "all 300ms"};
        color: ${(props) => props.hover && props.theme.white};
        ${(props) =>
            props.hover &&
            css`
                background-color: ${props.hoverbg};
                color: ${props.hoverColor};
            `}
    }
`;

export const Title = styled.h2<TitleType>`
    text-align: ${(props) => (props.align ? props.align : "center")};
    height: 50px;
    line-height: 50px;
    margin: 34px 0;
    color: ${(props) => props.theme.black};
`;
