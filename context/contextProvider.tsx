import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
// Types
import { CartType } from "../types/Cart";
import { ThemeType, UserType } from "../types/User";

const themes = {
    "light": {
        bgPrimary: "#fff",
        bgSecondary: "#F6F6F6",
        textPrimary: "#000",
        textSecondary: "rgba(0,0,0,0.6)",
        textTertiary: "rgba(0,0,0,0.38)",
        highlighted: "#0071e3",
        borderPrimary: "#DDDDDD",
        borderSecondary: "#F6F6F6"
    },
    "dark": {
        bgPrimary: "#121212",
        bgSecondary: "#1C1C1C",
        textPrimary: "rgba(255,255,255,0.87)",
        textSecondary: "rgba(255,255,255,0.6)",
        textTertiary: "rgba(255,255,255,0.38)",
        highlighted: "#0071e3",
        borderPrimary: "rgba(255,255,255, .12)",
        borderSecondary: "rgba(255,255,255, .08)"
    }
}

interface ContextType {
    theme: ThemeType,
    setTheme: Dispatch<SetStateAction<"light" | "dark">>,
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
    const [cart, setCart] = useState<CartType>({items: [], total: 0});
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
                setTheme: setTheme,
                isCartOpen: isCartOpen, 
                setIsCartOpen: setIsCartOpen, 
                cart: cart,
                setCart: setCart,
                setAuthToken: setAuthToken,
                user: user
            }}
        >
            {!isLoading ? children : <div>Loading...</div>}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)

export default UserProvider