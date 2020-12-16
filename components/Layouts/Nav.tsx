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
import { logoutRequest } from "../../redux/auth";
import { loadRequest } from "../../redux/loading";
import { useMore } from "../../hook";
import { useCookies } from "react-cookie";

const Container = styled.div`
    margin: 0 auto;
    font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
    --webkit-font-smoothing: antialiased;
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
    const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
    const dispatch = useDispatch();
    const { isLogin, isLogout } = useSelector((state: RootState) => state.auth);
    const { id } = useSelector((state: RootState) => state.auth.user);
    const results: BookData[] = useSelector(
        (state: RootState) => state.search.searchData
    );
    const isSearch: boolean = useSelector((state: RootState) => state.search);
    const onLogout = useCallback(() => {
        dispatch(logoutRequest());
    }, [dispatch]);

    const [onMore, display] = useMore({
        length: results.length,
        initial: 10,
        count: 10,
        limit: 100,
    });

    useEffect(() => {
        if (isLogout) {
            removeCookie("x_auth", {
                maxAge: 7 * 24 * 60 * 60,
            });
        }
    }, [isLogout]);

    useEffect(() => {
        if (searchText !== "") {
            dispatch(loadRequest());
            dispatch(getSearchRequest({ searchText, display }));
        } else {
            dispatch(getSearchFailure({ message: "입력 값이 없습니다." }));
        }
    }, [searchText, display]);

    const onSubmit = useCallback(
        (e: FormEvent<HTMLButtonElement | HTMLFormElement>) => {
            e.preventDefault();
            if (!searchText) {
                return alert("검색 값을 입력해주세요");
            }
            setSearchText("");

            router.push(`/search?query=${searchText}`);
        },
        [searchText, router]
    );

    const onClick = useCallback(() => {
        setSearchText((prev) => "");
        dispatch(getSearchFailure({ message: "닫기" }));
    }, [dispatch]);

    return (
        <Container>
            <MainHeader>
                <Link href="/">
                    <Logo>BookDB</Logo>
                </Link>
                <SearchForm
                    isSearch={isSearch}
                    searchText={searchText}
                    results={results}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    onClick={onClick}
                    onMore={onMore}
                />
                <UserForm>
                    {isLogin ? (
                        <>
                            <div onClick={onLogout}>로그아웃</div>
                            <Link href={`/mypage/${id}`}>
                                <div>내 글 보기</div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <div>로그인</div>
                            </Link>
                            <Link href="/register">
                                <div>회원가입</div>
                            </Link>
                        </>
                    )}
                </UserForm>
            </MainHeader>
            <NavList />
        </Container>
    );
};

export default Nav;
