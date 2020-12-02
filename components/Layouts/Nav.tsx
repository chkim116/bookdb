import styled from "@emotion/styled";
import { Button, Input } from "../../styles/CommonStyle";
import NavList from "./NavList";

const Container = styled.div`
    margin: 0 auto;
`;

const Logo = styled.div`
    font-size: 24px;
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

const Nav = () => {
    return (
        <Container>
            <MainHeader>
                <Logo>BookDB</Logo>
                <MainSearch>
                    <Input
                        type="text"
                        width="250px"
                        placeholder="제목으로 책 검색하기"
                    />
                    <Button width="30px" type="submit">
                        검색
                    </Button>
                </MainSearch>
                <UserForm>
                    <div>로그인</div>
                    <div>회원가입</div>
                </UserForm>
            </MainHeader>
            <NavList />
        </Container>
    );
};

export default Nav;
