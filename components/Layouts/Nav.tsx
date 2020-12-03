import styled from "@emotion/styled";
import Link from "next/link";
import { ChangeEvent, FormEvent } from "react";
import { Button, Input } from "../../styles/CommonStyle";
import NavList from "./NavList";

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

const MainSearch = styled.form``;

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

type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    searchText: string;
};

const Nav = ({ onChange, onSubmit, searchText }: Props) => {
    return (
        <Container>
            <MainHeader>
                <Link href="/">
                    <Logo>BookDB</Logo>
                </Link>
                <MainSearch onSubmit={onSubmit}>
                    <Input
                        onChange={onChange}
                        type="text"
                        width="250px"
                        value={searchText}
                        placeholder="제목으로 책 검색하기"
                    />
                    <Button width="30px" type="submit">
                        검색
                    </Button>
                </MainSearch>
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
