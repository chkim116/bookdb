import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { onClick } from "../../@types/types";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { loadRequest } from "../../redux/loading";
import { delReviewRequest } from "../../redux/review";

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
            border-bottom-left-radius: 8px;
        }
        &:nth-of-type(2) {
            background: ${(props) => props.theme.blue};
            border-bottom-right-radius: 8px;
        }
    }
`;

type Props = {
    review?: boolean;
    id: string;
};

const EditBoxForm = ({ id, review }: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const onDelete = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const { id } = e.currentTarget.dataset;

            if (window.confirm("삭제하십니까?")) {
                if (review) {
                    dispatch(loadRequest());
                    dispatch(delReviewRequest(id));
                }
            }
        },
        []
    );

    const onEdit = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const { id } = e.currentTarget.dataset;
            if (review) {
                router.push(`/board/review/edit/${id}`);
            }
        },
        []
    );

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
