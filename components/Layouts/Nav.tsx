import styled from "@emotion/styled";
import { Button, Input } from "../../styles/CommonStyle";
import theme from "../../styles/theme";

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

const NavMenu = styled.nav`
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: ${(props) => props.theme.yellow};
    & > ul {
        max-width: ${(props) => props.theme.maxWidth};
        margin: 0 auto;
        display: flex;
        width: 100%;
        justify-content: center;

        li {
            width: 150px;
            text-align: center;
            position: relative;
            font-size: ${(props) => props.theme.ls};
            font-weight: 100;
            div {
                cursor: pointer;

                &:hover {
                    background: ${(props) => props.theme.darkYellow};
                    color: ${(props) => props.theme.white};
                }
            }
            &:hover {
                div {
                    background: ${(props) => props.theme.darkYellow};
                    color: ${(props) => props.theme.white};
                }
                ul {
                    display: flex;
                }
            }
        }
    }
`;

const NavSubMenu = styled.ul`
    display: none;
    flex-direction: column;
    background-color: ${(props) => props.theme.white};
    cursor: pointer;

    li {
        width: 100%;
        border-bottom: 3px solid ${(props) => props.theme.border};
        &:hover {
            background: ${(props) => props.theme.border};
        }
    }
`;

const Nav = () => {
    return (
        <Container>
            <MainHeader>
                <Logo>BookDB</Logo>
                <MainSearch>
                    <Input type="text" width="250px" placeholder="입력" />
                    <Button width="30px" type="submit">
                        검색
                    </Button>
                </MainSearch>
                <UserForm>
                    <div>로그인</div>
                    <div>회원가입</div>
                </UserForm>
            </MainHeader>
            <NavMenu>
                <ul>
                    <li>
                        <div>추천</div>
                        <NavSubMenu>
                            <li>이달 신간</li>
                            <li>월간 베스트</li>
                        </NavSubMenu>
                    </li>
                    <li>
                        <div>책장</div>
                        <NavSubMenu>
                            <li>자유게시글</li>
                            <li>작품 리뷰</li>
                        </NavSubMenu>
                    </li>
                    <li>
                        <div>헌 책 거래</div>
                        <NavSubMenu>
                            <li>내 주변 찾기</li>
                            <li>사고 팔고</li>
                        </NavSubMenu>
                    </li>
                </ul>
            </NavMenu>
        </Container>
    );
};

export default Nav;
