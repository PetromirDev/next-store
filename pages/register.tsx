import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { NextPage } from "next"
// Components
import Auth from "../components/auth/Auth"
import { Column, Input, Row, RowInput } from "../components/auth/authStyles"
import Error from "../components/auth/Error"
import { validateRegister } from "../helpers/auth/validation"
// Helpers
import { server_url } from "../server-config"
// Types
import { RegisterType } from "../types/Auth"

const Register:NextPage = () => {
    const router = useRouter()
    const defaultValues = {
        fName: "",
        lName: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
    const [values, setValues] = useState<RegisterType>(defaultValues);
    const [errors, setErrors] = useState<RegisterType>(defaultValues);
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
        
        const errorValues = validateRegister(values)
        setErrors(errorValues)
        if(JSON.stringify(errorValues) == JSON.stringify(defaultValues)) {
            // setValues(defaultValues);    
            // alert("Success!")
            setIsSubmit(true);
        }
    }

    const handleRegister = () => {
        const {["repeatPassword"]: unused, ...body} = values;

        fetch(`${server_url}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(async(res) => {
          const data = await res.json()
          if(res.status == 200){
            router.replace("/login")
          }
          else{
            if(data.message == "user-exists"){
                setErrors(old => ({...old, email: "A user with this email already exists."}))
            }
            else{
              setErrors(old => ({...old, email: "Error!"}))
            }
          }
          setIsSubmit(false)
        })
    }

    useEffect(() => {
        if(isSubmit && JSON.stringify(errors) == JSON.stringify(defaultValues)) {
            handleRegister()
        }
    }, [isSubmit])
    return (
        <Auth
            title="Create your accout"
            text="Have an account?"
            linkText="Login"
            linkUrl="/login"
            submitButtonText="Register"
            onSubmit={handleSubmit}
        >
            <Row>
                <Column>
                    <RowInput
                        className="bg-primary text-secondary border-primary"
                        type="text" 
                        name="fName"
                        placeholder="Enter your first name"
                        value={values.fName}
                        onChange={handleChange}
                    />
                    <Error
                        message={errors.fName}
                    />
                </Column>
                <Column>
                    <RowInput
                        className="bg-primary text-secondary border-primary"
                        type="text" 
                        name="lName"
                        placeholder="Enter your last name"
                        value={values.lName}
                        onChange={handleChange}
                    />
                    <Error
                        message={errors.lName}
                    />
                </Column>
            </Row>
            <Input
                className="bg-primary text-secondary border-primary"
                type="email" 
                name="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
            />
            <Error 
                message={errors.email}
            />
            <Input
                className="bg-primary text-secondary border-primary"
                type="password" 
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
            />
            <Error 
                message={errors.password}
            />
            <Input
                className="bg-primary text-secondary border-primary"
                type="password" 
                name="repeatPassword"
                placeholder="Repeat your password"
                value={values.repeatPassword}
                onChange={handleChange}
            />
            <Error 
                message={errors.repeatPassword}
            />
        </Auth>
    )
}

export default Register;