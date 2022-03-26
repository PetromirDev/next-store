import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { useState } from "react"
import styled from "styled-components"
// Context
import { useUserContext } from "../../context/contextProvider"
// Components
import Footer from "../../components/navigation/Footer"
import Navbar from "../../components/navigation/Navbar"
import { Between, Center, Page, PrimaryButton } from "../../styles/styles"
// Helpers
import { AddToCart } from "../../helpers/cart/cart"
// Types
import { ProductType } from "../../types/Product"
import Remove from "@mui/icons-material/Remove"
import Add from "@mui/icons-material/Add"

const Product:NextPage<{data: ProductType}> = ({data}) => {
    const {user, setCart, setIsCartOpen} = useUserContext()
    const [quantity, setQuantity] = useState<number>(1)
    const {image, price, name, description, id} = data;
    
    return (
        <div>
            <Page>
                <Navbar/>
                <Center>
                    <ProductWrapper>
                        <ProductBody>
                            <ProductImage 
                                src={image}
                            />
                            <ProductRight>
                                <Column>
                                    <Name>{name}</Name>
                                    <Description>{description}</Description>
                                </Column>
                                <Column>
                                    <PriceWrapper>
                                        <QuantityWrapper>
                                            <Quantity>Quantity: </Quantity>
                                            <Remove
                                                sx={{fontSize: 16, opacity: .6}}
                                                onClick={() => setQuantity(old => old == 1 ? 1 : old - 1)}
                                            />
                                            <Quantity style={{margin: "0 5px"}}>{quantity}</Quantity>
                                            <Add
                                                sx={{fontSize: 16, opacity: .6}}
                                                onClick={() => setQuantity(old => old + 1)}
                                            />
                                        </QuantityWrapper>
                                        <Price>$ {price * quantity / 100}</Price>
                                    </PriceWrapper>
                                    <AddToCartButton onClick={() => AddToCart(user.id, id, quantity, setCart, image, price, name, setIsCartOpen)}>Add to cart</AddToCartButton>
                                </Column>
                            </ProductRight>
                        </ProductBody>
                        <Link href="/">
                            <BackLink>Back</BackLink>
                        </Link>
                    </ProductWrapper>
                </Center>
                <Footer/>
            </Page>
          
        </div>

    )
}

export const getServerSideProps:GetServerSideProps = async({params, query}) => {
    //@ts-ignore
    const data = await fetch(`http://localhost:3000/api/products/${params.id}`).then(res => res.json())
    
    return {
        props : {
            data
        }
    }
 }

const ProductBody = styled(Center)`
    width: 100%;
    justify-content: space-between;
    align-items: unset;
    @media (max-width: 924px) {
        flex-direction: column;
    }
`;

const ProductImage = styled.img`
    max-width: 450px;
    max-height: 450px;
    width: 100%;
`;

const ProductRight = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;   
    justify-content: space-between;
    max-width: 450px;
    flex: 1;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const Name = styled.h1`
    font-size: 2rem;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 1rem;
    opacity: .6;
`;

const PriceWrapper = styled(Between)`
    margin: 10px 0;
`;

const QuantityWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Quantity = styled.p`
    opacity: .6;
    margin-right: 10px;
`;

const Price = styled.h2`
    font-size: 1rem;
    font-weight: 300;
`;

const AddToCartButton = styled(PrimaryButton)`
    width: 100%;
    padding: 20px;
`;

const BackLink = styled.a`
    opacity: .6;
    font-size: 1rem;
    margin-top: 30px;
`;

const ProductWrapper = styled.div`
    padding: 40px 30px;
    padding-bottom: 15px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1000px;
    width: 100%;
    margin: 20px;
    @media (max-width: 924px) {
        width: unset;
    }
    @media (max-width: 500px) {
        ${Name} {
            font-size: 1.8rem;
        }
        ${Description} {
            font-size: 1rem;
        }
        ${BackLink} {
            margin-top: 15px;
        }
        padding: 20px;
    }
`;



export default Product;