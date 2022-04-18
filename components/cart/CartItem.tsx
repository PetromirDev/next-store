import {FC} from "react";
import styled from "styled-components";
// Context
import { useUserContext } from "../../context/contextProvider";
// Helpers
import { RemoveItemFromCart, UpdateCartItemQuantity } from "../../helpers/cart/cart";
// Types
import { CartItemType } from "../../types/Cart";
// Icons
import Close from "@mui/icons-material/Close";
import Plus from "@mui/icons-material/Add";
import Minus from "@mui/icons-material/Remove";

const CartItem:FC<CartItemType> = ({
    id,
    pid,
    image,
    name,
    quantity,
    price
}) => {
    const {theme, user, setCart} = useUserContext();

    const iconStyle = {
        fontSize: 24,
        color: theme.textPrimary
    }

    return (
        <CartItemWrapper className="border-primary">
            <ImageWrapper className="bg-secondary">
                <Image
                    src={image}
                    alt=""
                />
            </ImageWrapper>
            <Body>
                <Row>
                    <Name className="text-primary">{name}</Name>
                    <Close
                        onClick={() => RemoveItemFromCart(user, id, setCart)}
                        sx={iconStyle}
                        style={{
                            marginLeft: "auto"
                        }}
                    />
                </Row>
                <Row>
                    <QuantityWrapper>
                        <Minus 
                            onClick={() => UpdateCartItemQuantity(user, id, quantity, "decrement", setCart)}
                            sx={iconStyle}
                        />
                        <Quantity className="text-primary">{quantity}</Quantity>
                        <Plus
                            onClick={() => UpdateCartItemQuantity(user, id, quantity, "increment", setCart)}
                            sx={iconStyle}
                        />
                    </QuantityWrapper>
                    <Price>$ {price/100}</Price>
                </Row>
            </Body>
        </CartItemWrapper>

    )
}

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CartItemWrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid;
`;

const ImageWrapper = styled.div`
    padding: 8px;
    border-radius: 5px;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    max-width: 45px;
    max-height: 45px;
    height: auto;
`;

const Body = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
`;

const Name = styled.h2`
    font-size: 1.1rem;
    font-weight: 400;
`;

const Price = styled.h3`
    font-size: .9rem;
    font-weight: 300;
`;

const QuantityWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Quantity = styled.h3`
    font-size: .9rem;
    font-weight: 400;
    margin: 0 10px;
`;

export default CartItem