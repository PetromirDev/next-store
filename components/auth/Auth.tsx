import { FC } from 'react'
import styled from 'styled-components';
import Link from 'next/link';
// Components
import Footer from '../navigation/Footer';
import Navbar from '../navigation/Navbar';
import { Page, PrimaryButton } from '../../styles/styles';

const Auth:FC<{
    children: JSX.Element | JSX.Element[];
    title: string;
    text: string;
    linkText: string;
    linkUrl: string;
    submitButtonText: string;
    onSubmit:(e:React.FormEvent<HTMLFormElement>) => void;
}> = ({
    children,
    title,
    text,
    linkText,
    linkUrl,
    submitButtonText,
    onSubmit
}) => {
    return (
        <Page className="bg-secondary">
            <Navbar/>
            <AuthWrapper>
                <AuthForm onSubmit={onSubmit} className="bg-primary">
                    <Title className="text-primary">{title}</Title>
                    <Text className="text-secondary">
                        {text} 
                        <Link href={linkUrl}>
                            <LinkColor> {linkText}</LinkColor>
                        </Link>
                    </Text>
                    {children}
                    <SubmitButton type="submit">{submitButtonText}</SubmitButton>
                </AuthForm>
            </AuthWrapper>
            <Footer/>
        </Page>
    )
}

const AuthWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const AuthForm = styled.form`
    border-radius: 5px;
    padding: 30px;
    max-width: 550px;
    width: 100%;
    margin: 20px;
    @media (max-width: 768px) {
        padding: 20px;
        margin: 10px;
    }
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 10px;
`;

const Text = styled.p`
    font-size: 1rem;
    font-weight: 400;
    color: rgba(0,0,0,0.38);
    margin-bottom: 20px;
    text-align: center;
`;

const LinkColor = styled.a`
    color: #0071E3;
`;

const SubmitButton = styled(PrimaryButton)`
    width: 100%;
    padding: 20px;
    margin-top: 15px;
`;

export default Auth