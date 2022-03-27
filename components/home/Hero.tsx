import styled from "styled-components";
import {FC} from "react";
// Styles
import { Container } from "../../styles/styles";

const Hero:FC<{
    title: string;
    text: string;
    linkText: string;
    linkUrl: string;
    image: string;
}> = ({
    title, 
    text,
    linkText,
    linkUrl,
    image
}) => {
    return(
        <HeroWrapper className="bg-secondary">
            <Body> 
                <HeroLeft>
                    <Title className="text-primary">{title}</Title>
                    <Text className="text-primary">{text}</Text>
                    <Link 
                        className="text-highlighted"
                        href={linkUrl}
                    >
                        {linkText}
                    </Link>
                </HeroLeft>
                <HeroImageWrapper>
                    <HeroImage 
                        src={image}
                    />
                </HeroImageWrapper>
            </Body>
        </HeroWrapper>
    )
}

const HeroWrapper = styled.div`
    padding-top: 80px;
`;

const HeroLeft = styled.div`
    flex: 1;
    padding: 60px 0;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 4rem;
    font-weight: 400;
    max-width: 12ch;
    @media (max-width: 1076px) {
        font-size: 3rem;
    }

`;

const Text = styled.p`
    font-size: 1.1rem;
    font-weight: 300;
    margin-top: 10px;
    opacity: .8;
    @media (max-width: 1076px) {
        font-size: .95rem;
    }
`;

const Link = styled.a`
    font-size: 1.2rem;
    display: block;
    text-transform: uppercase;
    margin-top: 20px;
    @media (max-width: 1076px) {
        font-size: 1rem;
        margin-top: 10px;
    }
`;

const HeroImageWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    flex: 1.5;
    margin-top: 60px;
`;

const HeroImage = styled.img`
    width: 100%;
`;

const Body = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 60px;
    padding-top: 40px;
    @media (max-width: 920px) {
        flex-direction: column-reverse;
        text-align: center;
        justify-content: center;
        ${HeroLeft} {
            justify-content: center;
            align-items: center;
        }
        ${Title} {
            max-width: unset;
            font-size: 3rem;
        }
        ${Text} {
            font-size: 1.1rem;
        }
        ${Link} {
            font-size: 1.2rem;
            margin-top: 15px;
        }
    }
    @media (max-width: 768px) {
        padding: 20px;
        ${HeroLeft} {
            padding: 20px 0;
        }
    }
    @media (max-width: 400px) {
        ${Title} {
            font-size: 2rem;
        }
        ${Text} {
            font-size: .9rem;
        }
    }
`;




export default Hero