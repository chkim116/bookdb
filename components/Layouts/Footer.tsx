import styled from "@emotion/styled";

const Container = styled.footer`
    width: 100%;
`;

const Footer = styled.div`
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
    margin: 0 auto;
    text-align: center;
`;

const FooterForm = () => {
    return (
        <Container>
            <Footer>&copy; BookDB</Footer>
        </Container>
    );
};

export default FooterForm;
