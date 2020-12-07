import styled from "@emotion/styled";
import Link from "next/link";
import SearchForm from "../../Common/SearchForm";
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
    return (
        <Container>
            <MainHeader>
                <Link href="/">
                    <Logo>BookDB</Logo>
                </Link>
                <SearchForm />
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
