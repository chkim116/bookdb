import React from "react";
import styled from "@emotion/styled";

import { onClick } from "../../@types/types";

const EditBox = styled.div`
    display: flex;
    width: 100%;

    div {
        text-align: center;
        color: ${(props) => props.theme.white};
        width: 50%;
        cursor: pointer;
        &:nth-of-type(1) {
            background: ${(props) => props.theme.red};

            &:hover {
                background: ${(props) => props.theme.gray};
            }
        }
        &:nth-of-type(2) {
            background: ${(props) => props.theme.blue};
            &:hover {
                background: ${(props) => props.theme.gray};
            }
        }
    }
`;

type Props = {
    onDelete: onClick;
    onEdit: onClick;
    id: string;
};

const EditBoxForm = ({ id, onDelete, onEdit }: Props) => {
    return (
        <EditBox>
            <div data-id={id} onClick={onDelete}>
                X
            </div>
            <div data-id={id} onClick={onEdit}>
                Edit
            </div>
        </EditBox>
    );
};

export default EditBoxForm;
