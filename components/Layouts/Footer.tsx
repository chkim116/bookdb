import styled from "@emotion/styled";

const Container = styled.footer`
    background: ${(props) => props.theme.yellow};
    width: 100%;
`;

const Footer = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    margin: 0 auto;
    text-align: center;
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FooterForm = () => {
    return (
        <Container>
            <Footer>&copy; BookDB</Footer>
        </Container>
    );
};

export default FooterForm;
