import styled from "@emotion/styled";

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
    radius?: boolean;
};

export const Container = styled.div`
    width: 100%;
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

    &:hover {
        background: ${(props) => props.hover && props.theme.shadow};
        transition: ${(props) => props.hover && "all 300ms"};
        color: ${(props) => props.hover && props.theme.white};
    }
`;
