import {FC} from "react";
import styled from "styled-components";

const Footer:FC<{}> = () => {
    return (
        <FooterWrapper>
            <Text>Made with <Red>❤</Red> and NextJS by Petromir Petrov️</Text>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.div`
    padding: 20px;
    background-color: black;
`;

const Text = styled.p`
    color: white;
    text-align: center;
    font-size: 1.2rem;
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const Red = styled.span`
    color: red;
`;

export default Footer;