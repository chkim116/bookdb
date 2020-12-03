import styled from "@emotion/styled";
import MainPage from "../components/Home/MainPage";

const Container = styled.div`
    width: 100%;
`;

export default function Home() {
    return (
        <Container>
            <MainPage />
            <div></div>
        </Container>
    );
}
