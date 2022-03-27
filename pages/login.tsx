import React, { FC, useEffect, useState } from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"
// Context
import { useUserContext } from "../context/contextProvider"
// Components
import Auth from "../components/auth/Auth"
import { Input } from "../components/auth/authStyles"
import Error from "../components/auth/Error"
// Types
import { LoginType } from "../types/Auth"
// Helpers
import { validateLogin } from "../helpers/auth/validation"

const login:NextPage = () => {
    const {setAuthToken} = useUserContext()
    const router = useRouter()
    const defaultValues = {
        email: "",
        password: ""
    }
    const [values, setValues] = useState<LoginType>(defaultValues);
    const [errors, setErrors] = useState<LoginType>(defaultValues);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(old => ({
            ...old,
            [name]: value
        }))
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorValues = validateLogin(values)
        setErrors(errorValues)
        if(JSON.stringify(errorValues) == JSON.stringify(defaultValues)) {
            // setValues(defaultValues);
            setIsSubmit(true);
        }
    }

    useEffect(() => {
        if(isSubmit && JSON.stringify(errors) == JSON.stringify(defaultValues)) {
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(async(res) => {
                const authToken = res.headers.get('auth-token')
                if(authToken){
                    await localStorage.setItem('auth-token', authToken)
                    await setAuthToken(authToken)
                    router.replace('/')
                } else{
                    setErrors(old => ({...old, email: "Invalid email or password"}))
                }
                setIsSubmit(false)
            })
        }
    }, [isSubmit])

    return (
        <Auth
            title="Welcome back"
            text="Don't have an account?"
            linkText="Register"
            linkUrl="/register"
            submitButtonText="Login"
            onSubmit={handleSubmit}
        >
            <Input 
                className="bg-primary text-secondary border-secondary"
                name="email"
                type="email" 
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
            />
            <Error
                message={errors.email}
            />
            <Input 
                className="bg-primary text-secondary border-secondary"
                name="password"
                type="password" 
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
            />
            <Error
                message={errors.password}
            />
        </Auth>
    )
}

export default login