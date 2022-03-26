import styled from "styled-components"
import { Center } from "../../styles/styles";

export const Input = styled.input`
    padding: 19px;
    width: 100%;
    margin-top: 15px;
    font-size: 1rem;
`;

export const Row = styled(Center)`
    align-items: flex-start;
    @media (max-width: 500px) {
        flex-direction: column;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (min-width: 500px){
        &:first-child {
            margin-right: 5px;
        }
        &:last-child {
            margin-left: 5px;
        }
    }
`;

export const RowInput = styled(Input)`
  
`;