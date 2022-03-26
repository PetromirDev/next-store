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
    background-color: #000;
    padding: 20px;
`;

const Text = styled.p`
    text-align: center;
    color: #fff;
    font-size: 1.2rem;
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const Red = styled.span`
    color: red;
`;

export default Footer;