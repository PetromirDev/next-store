import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/navigation/Navbar";
// CONTEXT API
import { useUserContext } from "../context/contextProvider";
import { Center, Page } from "../styles/styles";

const Profile:NextPage = () => {
    const Router = useRouter();
    const {user, theme} = useUserContext();

    useEffect(() => {
        if(user === null) {
            Router.push("/login")
        }
    }, [])
    return (user ?
        <Page className="bg-secondary">
            <Navbar/>
            <UserData>
                <ProfilePicture src={user.photoURL} backgroundColor={theme.bgPrimary}/>
                <Name color={theme.textPrimary}>Welcome {user.fName}</Name>
                <Email color={theme.textSecondary}>{user.email}</Email>
                <LogoutButton href="/logout" borderColor={theme.textTertiary} color={theme.textTertiary}>Logout</LogoutButton>
            </UserData>
        </Page>
    : <p>Redirectting you to the login page...</p>)
}

export default Profile;

const ProfilePicture = styled.img<{backgroundColor: string}>`
    max-width: 250px;
    border-radius: 100%;
    background-color: ${props => props.backgroundColor}
`;

const UserData = styled(Center)`
    padding-top: 150px;
    flex-direction: column;
    justify-content: flex-start;
`;

const Name = styled.h1<{color: string}>`
    font-size: 2.5rem;
    color: ${props => props.color};
    margin-top: 25px;
`;

const Email = styled.h2<{color: string}>`
    font-size: 1.8rem;
    color: ${props => props.color};
    margin-top: 15px;
`;

const LogoutButton = styled.a<{borderColor: string; color: string;}>`
    display: block;
    margin-top: 50px;
    background-color: transparent;
    border: 1px solid ${props => props.borderColor};
    color: ${props => props.color};
    font-size: 1.2rem;
    padding: 15px;
    max-width: 300px;
    width: 100%;
    border-radius: 8px;
    text-align: center;
`;