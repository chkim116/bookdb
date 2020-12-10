import styled from "@emotion/styled";
import Link from "next/link";
import SearchForm from "./SearchForm";
import NavList from "./NavList";
import { useInput } from "@cooksmelon/event";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { BookData } from "../../@types/types";
import { FormEvent, useCallback, useEffect } from "react";
import { getSearchFailure, getSearchRequest } from "../../redux/search";

const Container = styled.div`
    margin: 0 auto;
`;

const Logo = styled.div`
    font-size: 24px;
    cursor: pointer;
    font-weight: bold;
`;

const MainHeader = styled.header`
    max-width: ${(props) => props.theme.maxWidth};
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 10px;
    margin: 0 auto;
    height: 120px;
    align-items: center;
`;

const UserForm = styled.div`
    display: flex;
    div {
        margin: 0 6px;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const Nav = () => {
    const [searchText, onChange, setSearchText] = useInput("");
    const router = useRouter();
    const dispatch = useDispatch();
    const results: BookData[] = useSelector(
        (state: RootState) => state.search.searchData
    );

    useEffect(() => {
        if (searchText !== "") {
            dispatch(getSearchRequest({ searchText: searchText }));
        } else {
            dispatch(getSearchFailure({ message: "입력 값이 없습니다." }));
        }
    }, [searchText]);

    const onSubmit = useCallback(
        (e: FormEvent<HTMLButtonElement | HTMLFormElement>) => {
            e.preventDefault();
            setSearchText("");
            router.push(`/search?query=${searchText}`);
        },
        [searchText]
    );

    return (
        <Container>
            <MainHeader>
                <Link href="/">
                    <Logo>BookDB</Logo>
                </Link>
                <SearchForm
                    searchText={searchText}
                    results={results}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
                <UserForm>
                    <Link href="/login">
                        <div>로그인</div>
                    </Link>
                    <Link href="/register">
                        <div>회원가입</div>
                    </Link>
                </UserForm>
            </MainHeader>
            <NavList />
        </Container>
    );
};

export default Nav;
