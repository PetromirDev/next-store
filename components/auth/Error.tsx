import { Alert } from "../../styles/styles";
import {FC} from "react";

const Error:FC<{message:string;}> = ({message}) => {
    return (message ?
        <Alert>{message}</Alert>
    : null)
}

export default Error;