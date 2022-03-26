import { FC } from 'react';
import styled from "styled-components";
import Link from 'next/link';
// Context
import { useUserContext } from '../context/contextProvider';
// Helpers
import { AddToCart } from '../helpers/cart/cart';
// Types
import { ProductType } from '../types/Product';
// Icons
import ShoppingBagIcon from "@mui/icons-material/ShoppingBagOutlined"

const Product: FC<ProductType> = ({ 
    id, 
    image, 
    price, 
    name
}) => {
    const {setCart, user, setIsCartOpen} = useUserContext()
    return (
        <ProductWrapper>
            <ImageWrapper>
                <Image 
                    src={image}
                />
            </ImageWrapper>
            <Body>
                <Link href={`/product/${id}`}>
                    <div className="pointer">
                        <Name>{name}</Name>
                        <Price>$ {price/100}</Price>
                    </div>
                </Link>
                <Cart onClick={() => AddToCart(user.id, id, 1, setCart, image, price, name, setIsCartOpen)}>
                    <ShoppingBagIcon
                        sx={{
                            color: '#fff',
                            fontSize: '26px',
                        }}
                    />
                </Cart>
            </Body>
        </ProductWrapper>
    )
}

const ProductWrapper = styled.div`
    max-width: 300px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    max-width: 180px;
`;

const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
`;

const Name = styled.h2`
    font-size: 1.2rem;
    font-weight: 500;
`;

const Price = styled.h3`
    margin-top: 5px;
    font-weight: 400;
`;

const Cart = styled.div`
    padding: 12px;
    cursor: pointer;
    border-radius: 100%;
    background-color: #0071E3;
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export default Product
