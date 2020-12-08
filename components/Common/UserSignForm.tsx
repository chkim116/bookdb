import React from "react";
import styled from "@emotion/styled";
import { Button, Input } from "../../styles/CommonStyle";
import login from "../../images/login.jpg";
import theme from "../../styles/theme";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

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

    h2 {
        height: 50px;
        line-height: 50px;
        text-align: center;
    }

    img {
        position: absolute;
        filter: blur(3px);
        top: 0;
        left: 0;
        right: 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;

const LoginForm = styled.form`
    width: 450px;
    padding: 36px;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    z-index: 50000;
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
    color: ${(props) => props.theme.blue};
    width: 100%;
    text-align: center;
    margin-top: 50px;
`;

type Props = {
    register: boolean;
};

const UserSignForm = ({ register }: Props) => {
    const router = useRouter();
    const onGoBack = () => {
        router.back();
    };
    return (
        <Container>
            <img src={login} alt="배경사진" />
            <LoginForm>
                <h2>{register ? "회원가입" : "로그인"}</h2>
                <div>
                    <Input
                        width="250px"
                        type="email"
                        placeholder="아이디 입력 / 이메일 *"
                        name="userId"
                    />
                    <Input
                        width="250px"
                        type="password"
                        placeholder="비밀번호 입력 *"
                        name="password"
                    />
                    {register && (
                        <>
                            <Input
                                width="250px"
                                type="password"
                                name="verifyPassword"
                                placeholder="비밀번호 확인 *"
                            />
                            <Input
                                width="250px"
                                type="text"
                                name="nickName"
                                placeholder="닉네임 *"
                            />
                        </>
                    )}
                    <div>
                        <Button
                            hover={true}
                            hoverColor={theme.black}
                            hoverbg={theme.gray}
                            color={theme.white}
                            bg={theme.blue}
                            radius={true}
                            type="submit">
                            {register ? "가입완료" : "로그인"}
                        </Button>
                        <Link href={register ? "/login" : "/register"}>
                            <Button
                                hover={true}
                                hoverColor={theme.black}
                                radius={true}
                                hoverbg={theme.gray}
                                type="button">
                                {register ? "로그인" : "회원가입"}
                            </Button>
                        </Link>
                    </div>
                </div>
                <Back type="button" onClick={onGoBack}>
                    뒤로가기
                </Back>
            </LoginForm>
        </Container>
    );
};

export default UserSignForm;
