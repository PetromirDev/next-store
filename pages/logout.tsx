import { useRouter } from "next/router";
import { useEffect } from "react"

const Logout = () => {
    const Router = useRouter();
    useEffect(() => {
        localStorage.removeItem("auth-token");
        Router.push("/")
    }, [])

    return (
        <p>Logging you out...</p>
    )
}

export default Logout;