import React from "react";

import styled from "@emotion/styled";

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

const NavList = () => {
    return (
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
    );
};

export default NavList;