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
    const {
        theme, 
        user, 
        setCart, 
        setIsCartOpen
    } = useUserContext();
    const [quantity, setQuantity] = useState<number>(1)
    const {image, price, name, description, id} = data;
    
    return (
        <div>
            <Page className="bg-secondary">
                <Navbar/>
                <Center>
                    <ProductWrapper className="bg-primary">
                        <ProductBody>
                            <ProductImage 
                                src={image}
                            />
                            <ProductRight>
                                <Column>
                                    <Name className="text-primary">{name}</Name>
                                    <Description className="text-secondary">{description}</Description>
                                </Column>
                                <Column>
                                    <PriceWrapper>
                                        <QuantityWrapper>
                                            <Quantity className="text-secondary">Quantity: </Quantity>
                                            <Remove
                                                sx={{fontSize: 16, color: theme.textSecondary}}
                                                onClick={() => setQuantity(old => old == 1 ? 1 : old - 1)}
                                            />
                                            <Quantity style={{margin: "0 5px"}} className="text-secondary">{quantity}</Quantity>
                                            <Add
                                                sx={{fontSize: 16, color: theme.textSecondary}}
                                                onClick={() => setQuantity(old => old + 1)}
                                            />
                                        </QuantityWrapper>
                                        <Price className="text-secondary">$ {price * quantity / 100}</Price>
                                    </PriceWrapper>
                                    <AddToCartButton onClick={() => AddToCart(user.id, id, quantity, setCart, image, price, name, setIsCartOpen).then(() => setQuantity(1))}>Add to cart</AddToCartButton>
                                </Column>
                            </ProductRight>
                        </ProductBody>
                        <Link href="/">
                            <BackLink className="text-tertiary">Back</BackLink>
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
`;

const PriceWrapper = styled(Between)`
    margin: 10px 0;
`;

const QuantityWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Quantity = styled.p`
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
    font-size: 1rem;
    margin-top: 30px;
`;

const ProductWrapper = styled.div`
    padding: 40px 30px;
    padding-bottom: 15px;
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