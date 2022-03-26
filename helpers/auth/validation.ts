import { LoginType, RegisterType } from "../../types/Auth";

const validateEmail = (email:string) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

export const validateLogin = (values:LoginType) => {
    const {
        email,
        password
    } = values;

    let errors = {
        email: '',
        password: ''
    }

    if (!email) {
        errors.email = "Please enter your email.";
    } else if (validateEmail(email)) {
        errors.email = "Invalid email address.";
    }

    if (!password) {
        errors.password = "Please enter your password.";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    return errors;
}

export const validateRegister = (values:RegisterType) => {
    // TODO
    const {
        fName,
        lName,
        email,
        password,
        repeatPassword
    } = values;

    let errors = {
        fName: '',
        lName: '',
        email: '',
        password: '',
        repeatPassword: ''
    }

    if (!fName) {
        errors.fName = "Please enter your first name.";
    } else if (fName.length < 2) {
        errors.fName = "First name must be at least 2 characters.";
    }

    if (!lName) {
        errors.lName = "Please enter your last name.";
    } else if(lName.length < 2) {
        errors.lName = "Last name must be at least 2 characters.";
    }

    if (!email) {
        errors.email = "Please enter your email.";
    } else if (validateEmail(email)) {
        errors.email = "Invalid email address.";
    }

    if (!password) {
        errors.password = "Please enter your password.";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    if (!repeatPassword) {
        errors.repeatPassword = "Please repeat your password.";
    } else if (repeatPassword !== password) {
        errors.repeatPassword = "Passwords do not match.";
    }

    return errors;
}