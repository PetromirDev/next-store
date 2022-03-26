import Link from 'next/link';
import {FC} from 'react';
import styled from "styled-components";

const Category:FC<{
    title: string;
    text: string;
    category: string;
    imageSrc: string;
    maxImageWidth: string;
    maxImageHeight: string;
    imageRight: string;
}> = ({
    title, 
    text,
    category,
    imageSrc,
    maxImageWidth,
    maxImageHeight,
    imageRight
}) => {
    return (
        <Link href={`/search?categories=${category}`}>
            <CategoryWrapper>
                <Body>
                    <Title>{title}</Title>
                    <Text>{text}</Text>
                </Body>
                {/* <Image 
                    src={imageSrc}
                    maxImageWidth={maxImageWidth}
                    maxImageHeight={maxImageHeight}
                    imageRight={imageRight}
                /> */}
            </CategoryWrapper>
        </Link>
    )
}

const Image = styled.img<{
    maxImageWidth: string;
    maxImageHeight: string;
    imageRight: string;
}>`
    max-width: ${props => props.maxImageWidth};
    max-height: ${props => props.maxImageHeight};
    height: auto;
    transform: rotate(4deg);
    position: absolute;
    right: ${props => props.imageRight};
    justify-self: flex-end;
    bottom: auto;
    transition: .3s linear;
`;

const CategoryWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 40px;
    border-radius: 8px;
    background-color: #F6F6F6;
    margin: 0 20px;
    max-width: 400px;
    width: 100%;
    position: relative;
    cursor: pointer;
    &:hover > ${Image} {
        bottom: 0;
    }
`;

const Body = styled.div`
    // max-width: 210px;
    width: 100%;
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 5px;
`;

const Text = styled.p`
    font-size: 1rem;
    opacity: .6;
`;



export default Category