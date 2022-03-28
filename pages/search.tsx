import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
//Components
import Filters from "../components/filters/Filters";
import Footer from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import Product from "../components/Product";
import { Center, Container, Page } from "../styles/styles";
// Types
import { ProductType } from "../types/Product";

const Search:NextPage = () => {
    const query = useRouter().query;
    const queryCategories = query.categories as string;
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 0 });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if(query.categories) {
            setCategories([queryCategories]);
        }
    }, [])

    useEffect(() => {
        fetch(`https://next-store-fqtnyzi3g-pgameplay.vercel.app/api/products?q=${query.q}&categories=${categories}&min=${priceRange.min * 100}&max=${priceRange.max * 100}`).then(res => res.json()).then(data => {
            setProducts(data);
        }).then(() => setIsLoading(false))
    }, [categories, priceRange])

    return (!isLoading ?
        <Page className="bg-secondary">
            <Navbar/>
            <PageContent>
                <ResultsWrapper className="bg-primary">
                    <Filters
                        categories={categories}
                        setCategories={setCategories}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />
                    <Products>
                        {products.map(product => (
                            <Product
                                key={product.id}    
                                id={product.id}
                                name={product.name}
                                image={product.image}
                                price={product.price}
                                category={product.category}
                            />
                        ))}      
                        {products.length === 0 ? 
                        <p>No results</p>: null}          
                    </Products>
                </ResultsWrapper>
            </PageContent>
            <Footer/>
        </Page> : <p>Loading...</p>
    )
}

const PageContent = styled(Center)`
    align-items: flex-start;
    padding-top: 80px;
`;

const ResultsWrapper = styled(Container)`
    border-radius: 5px;
    padding: 20px;
    display: flex;
    margin: 30px 20px;
    width: 100%;
    @media (max-width: 920px) {
        flex-direction: column;
    }
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const Products = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-left: 50px;
    gap: 20px;
    justify-items: center;
    @media (max-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 920px) {
        padding-left: 0;
        padding-top: 30px;
    }
    @media (max-width: 630px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

export default Search;