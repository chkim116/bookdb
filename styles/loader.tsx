import styled from "@emotion/styled";

const Loadering = styled.div`
    z-index: 1000000;
    width: 100%;
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    .loader {
        overflow: hidden;
        position: absolute;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .bar {
            width: 10px;
            height: 5px;
            background: ${(props) => props.theme.yellow};
            margin: 2px;
            animation: bar 1s infinite linear;

            &:nth-of-type(1) {
                animation-delay: 0s;
            }

            &:nth-of-type(2) {
                animation-delay: 0.25s;
            }

            &:nth-of-type(3) {
                animation-delay: 0.5s;
            }
        }
    }

    @keyframes bar {
        0% {
            transform: scaleY(1) scaleX(0.5);
        }

        50% {
            transform: scaleY(10) scaleX(1);
        }

        100% {
            transform: scaleY(1) scaleX(0.5);
        }
    }
`;

const Loader = () => {
    return (
        <Loadering>
            <div className="loader">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"> </div>
            </div>
        </Loadering>
    );
};

export default Loader;
