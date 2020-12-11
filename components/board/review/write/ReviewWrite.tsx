import React from "react";
import {
    BookData,
    onChange,
    onClick,
    onFormChange,
    onSubmit,
} from "../../../../@types/types";
import WriteCommonForm from "../../../Common/WriteForm";

type Props = {
    onChange: onFormChange;
    onWrite: onChange;
    onFindId: onClick;
    onSubmit: onSubmit;
    selectBook: BookData;
    results: BookData[];
    searchText: string | number;
};

const ReviewWrite = ({
    onChange,
    onWrite,
    onFindId,
    selectBook,
    results,
    onSubmit,
    searchText,
}: Props) => {
    return (
        <WriteCommonForm
            review={true}
            update={false}
            onChange={onChange}
            onWrite={onWrite}
            onFindId={onFindId}
            selectBook={selectBook}
            results={results}
            onSubmit={onSubmit}
            searchText={searchText}
        />
    );
};

export default ReviewWrite;
