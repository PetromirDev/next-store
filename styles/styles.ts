import styled from "styled-components"

export const Container = styled.div`
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
`;

export const Separator = styled.div`
    width: 100%;
    height: 3px;
    border-radius: 5px;
    background-color: #E3E3E3;
    margin: 0 auto;
`;

export const PrimaryButton = styled.button`
    background-color: #0071E3;
    padding: 15px;
    color: #fff;
    font-size: 1rem;
    font-weight: 400;
`;

export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

export const Alert = styled.p`
    padding: 15px 20px;
    color: #5f2120;
    border-radius: 5px;
    background-color: #FDEDED;
    font-size: .9rem;
    font-weight: 300;
    margin-top: 5px;
    &:last-child {
        margin-bottom: 0;
    }
`;

export const Page = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const Between = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;
