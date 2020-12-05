import React from "react";
import styled from "@emotion/styled";
import { Button, Input } from "../../styles/CommonStyle";
import login from "../../images/login.jpg";
import theme from "../../styles/theme";

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    margin: 0 auto;
    z-index: 5005;
    background: ${(props) => props.theme.gray};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        position: absolute;
        filter: blur(3px);
        top: 0;
        left: 0;
        right: 0;
        object-fit: fill;
        width: 100%;
    }
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 450px;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    z-index: 50000;
    justify-content: space-around;
    background-color: ${(props) => props.theme.darkWhite};
    border-radius: 12px;
    div {
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        input {
            margin: 12px 0;
            border: 1px solid ${(props) => props.theme.gray};
            height: 30px;
        }

        div {
            flex-direction: row;
            button {
                margin: 3px 8px;
            }
        }
    }
`;

const Back = styled.button`
    color: ${(props) => props.theme.black};
`;

const Login = () => {
    return (
        <Container>
            <img src={login} alt="배경사진" />
            <LoginForm>
                <h2>로그인</h2>
                <div>
                    <Input
                        width="250px"
                        type="email"
                        placeholder="아이디 입력"
                        name="userId"
                    />
                    <Input
                        width="250px"
                        type="password"
                        placeholder="비밀번호 입력"
                        name="password"
                    />
                    <div>
                        <Button
                            hover={true}
                            hoverColor={theme.black}
                            hoverbg={theme.gray}
                            color={theme.white}
                            bg={theme.blue}
                            radius={true}
                            type="submit">
                            로그인
                        </Button>
                        <Button
                            hover={true}
                            hoverColor={theme.black}
                            radius={true}
                            hoverbg={theme.gray}
                            type="button">
                            회원가입
                        </Button>
                    </div>
                </div>
                <Back type="button">뒤로가기</Back>
            </LoginForm>
        </Container>
    );
};

export default Login;
