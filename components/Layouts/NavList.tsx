import React from "react";

import styled from "@emotion/styled";
import Link from "next/link";

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
            z-index: 500;
            text-align: center;
            position: relative;
            font-size: ${(props) => props.theme.ls};
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
                    <Link href="/bestseller/0">
                        <div>베스트셀러</div>
                    </Link>
                </li>
                <li>
                    <Link href="/board/freeboard">
                        <div>책장</div>
                    </Link>

                    <NavSubMenu>
                        <Link href="/board/freeboard">
                            <li>자유게시글</li>
                        </Link>
                        <Link href="/board/review">
                            <li>작품 리뷰</li>
                        </Link>
                    </NavSubMenu>
                </li>
                <li>
                    <Link href="/sell">
                        <div>중고거래</div>
                    </Link>
                    <NavSubMenu>
                        <Link href="/sell/around">
                            <li>내주변 찾기</li>
                        </Link>
                        <Link href="/sell/trade">
                            <li>사고 팔고</li>
                        </Link>
                    </NavSubMenu>
                </li>
            </ul>
        </NavMenu>
    );
};

export default NavList;
