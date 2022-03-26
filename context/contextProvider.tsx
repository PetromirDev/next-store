import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
// Types
import { CartType } from "../types/Cart";
import { UserType } from "../types/User";

const themes = {
    "light": {
        backgroundColor: "#fff",
        primary: "#000",
    },
    "dark": {
        backgroundColor: "#000",
        primary: "#fff",
    }
}

interface ContextType {
    theme: {
        backgroundColor: string;
        primary: string;
    },
    isCartOpen: boolean;
    setIsCartOpen: (isCartOpen: boolean) => void;
    cart: CartType;
    setCart: Dispatch<SetStateAction<CartType>>;
    setAuthToken: Dispatch<SetStateAction<string>>;
    user: UserType;
}

const UserContext = createContext<ContextType>({} as ContextType);

const UserProvider:FC<{children?: JSX.Element | JSX.Element[]}> = ({children}) => {
    const [theme, setTheme] = useState<keyof typeof themes>("light");
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [cart, setCart] = useState<CartType>({
        items: [],
        total: 0
    });
    const [user, setUser] = useState<UserType>({} as UserType)
    const [authToken, setAuthToken] = useState<string>(() => {
        // Getting token from local storage
        if(typeof window !== 'undefined'){
            return localStorage.getItem('auth-token') || ""
        } else {
            return ""
        }
    })
    const [isLoading, setIsisLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        if(typeof window !== 'undefined'){
            localStorage.setItem('auth-token', authToken)
            if(isMounted && authToken){
                setIsisLoading(() => {
                    setUser(jwt_decode(authToken))
                    console.log(jwt_decode(authToken))
                    return false;
                })
            } else {
                setIsisLoading(false)
            }
        }
        return () => {isMounted = false;}
    }, [authToken])

    return (
        <UserContext.Provider 
            value={{
                theme: themes[theme], 
                isCartOpen: isCartOpen, 
                setIsCartOpen: setIsCartOpen, 
                cart: cart,
                setCart: setCart,
                setAuthToken: setAuthToken,
                user: user,
            }}
        >
            {!isLoading ? children : <div>Loading...</div>}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)

export default UserProvider