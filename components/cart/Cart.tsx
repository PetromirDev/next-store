import {FC, useCallback, useEffect} from "react";
import styled from "styled-components";
// Context
import { useUserContext } from "../../context/contextProvider";
// Components
import { PrimaryButton, Separator } from "../../styles/styles";
import CartItem from "./CartItem";
// Icons
import Close from "@mui/icons-material/Close";
// Helpers
import { server_url } from "../../server-config";

const Cart:FC = () => {
    const {
        theme,
        isCartOpen, 
        setIsCartOpen,
        cart,
        setCart,
        user
    } = useUserContext();

    const getCartItems = useCallback(() => {
        if(user !== null) {
            fetch(`${server_url}/cart?uid=${user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(data => setCart(old => {
                return {
                    ...old, 
                    items: data
                }
            }))
        }
    }, [user])

    useEffect(() => {
        getCartItems()
    }, [])
    
    useEffect(() => {
        setCart(old => {
            let total = 0
            old.items.forEach(item => {
                total += item.price * item.quantity
            })
            return ({
                ...old,
                total: total
            })
        })
    }, [cart.items])

    const handleCheckout = () => {
        if(user !== null) {
            alert("Thank you for coming to my website!")
        }
    }

    return (
        <CartWrapper
            isCartOpen={isCartOpen}
            className="bg-primary"
        >
            <div>
                <Header className="border-primary">
                    <Title className="text-primary">Your cart</Title>
                    <Close
                        sx={{
                            fontSize: 28,
                            color: theme.textPrimary
                        }}
                        style={{
                            position: "absolute",
                            right: 20,
                            cursor: "pointer"
                        }}
                        onClick={() => setIsCartOpen(false)}
                    />
                </Header>
                <Body>
                    {cart.items ? cart.items.map(item => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            pid={item.pid}
                            image={item.image}
                            name={item.name}
                            price={item.price * item.quantity}
                            quantity={item.quantity}
                        />
                    )) : null}
                </Body>
            </div>
            <Bottom>
                <SubtotalWrapper>
                    <SubtotalText className="text-primary">Subtotal</SubtotalText>
                    <Subtotal className="text-primary">$ {cart.total/100}</Subtotal>
                </SubtotalWrapper>
                <SubtotalSeparator className="bg-secondary"/>
                <CheckoutButton onClick={handleCheckout}>Secure checkout</CheckoutButton>
            </Bottom>

        </CartWrapper>
    )
}

const CartWrapper = styled.div<{isCartOpen: boolean}>`
    top: 0;
    right: 0;
    height: 100vh;
    z-index: 11;
    max-width: 650px;
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    transform: translateX(${props => props.isCartOpen ? 0 : "100%"});
    transition: transform .3s ease-in-out;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 20px;
    justify-content: center;
    border-bottom: 1px solid;
    position: relative;
`;

const Title = styled.h2`
    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;
`;

const Body = styled.div`
    padding: 20px;
`;

const Bottom = styled.div`
    padding: 20px;
    box-shadow: 0 -2px 5px 0px rgba(0,0,0,0.1);
`;

const SubtotalWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const SubtotalText = styled.h3`
    font-size: 1.2rem;
    font-weight: 500;
`;

const Subtotal = styled.h3`
    font-size: 1.2rem;
    font-weight: 400;
`;

const SubtotalSeparator = styled(Separator)`
    height: 1px;
    margin: 10px 0;
`;

const CheckoutButton = styled(PrimaryButton)`
    width: 100%;
    padding: 25px 0;
    margin-top: 10px;
    @media (max-width: 768px) {
        padding: 20px 0;
    }
`;  

export default Cart;