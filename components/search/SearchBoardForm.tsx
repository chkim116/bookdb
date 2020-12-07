import React from "react";
import { SearchResults } from "../../@types/types";

import styled from "@emotion/styled";

const ResultsContainer = styled.div``;

type Props = {
    results: SearchResults[];
};

const SearchBoardForm = ({ results }: Props) => {
    return <ResultsContainer></ResultsContainer>;
};

export default SearchBoardForm;
