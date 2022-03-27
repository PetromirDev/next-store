import Link from 'next/link';
import {FC} from 'react';
import styled from "styled-components";

const Category:FC<{
    title: string;
    text: string;
    category: string;
}> = ({
    title, 
    text,
    category
}) => {
    return (
        <Link href={`/search?categories=${category}`}>
            <CategoryWrapper className="bg-secondary">
                <Body>
                    <Title className="text-primary">{title}</Title>
                    <Text className="text-secondary">{text}</Text>
                </Body>
            </CategoryWrapper>
        </Link>
    )
}

const CategoryWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 40px;
    border-radius: 8px;
    margin: 0 20px;
    max-width: 400px;
    width: 100%;
    position: relative;
    cursor: pointer;
    flex: 1;
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
`;



export default Category