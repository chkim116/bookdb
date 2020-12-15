import { useToggle } from "@cooksmelon/event";
import Axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import Mypage from "../../components/mypage/Mypage";
import { Seo } from "../../head/Seo";
import { RootState } from "../../redux";
import { authRequest } from "../../redux/auth";
import wrapper from "../../store/configureStore";
import { Container } from "../../styles/CommonStyle";

const index = ({ userPost }: any) => {
    const [review, onToggle] = useToggle(false);
    const { isAuth, isLogin } = useSelector((state: RootState) => state.auth);

    const router = useRouter();
    useEffect(() => {
        if (!isAuth && !isLogin) {
            alert("로그인 하셔야 이용가능합니다.");
            router.push("/");
        }
    }, [isAuth, isLogin]);

    const data = {
        title: `마이페이지`,
        description: "마이 페이지 내 글을 조회해보세요, BookDB",
        canonical: `${router.asPath}`,
    };

    return (
        <Container>
            <Seo data={data} />
            {isAuth && isLogin && (
                <Mypage
                    userPost={userPost}
                    review={review}
                    onToggle={onToggle}></Mypage>
            )}
        </Container>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const { store, params } = ctx;

    const cookie = ctx.req?.headers?.cookie;
    Axios.defaults.headers.Cookie = "";

    if (ctx.req && cookie) {
        Axios.defaults.headers.Cookie = cookie;
        store.dispatch(authRequest());
        store.dispatch(END);
        await store.sagaTask.toPromise();
    }

    const userPost = await Axios.get(`/userpost/${params.id}`).then(
        (res) => res.data
    );

    return {
        props: {
            userPost,
        },
    };
});

export default index;
