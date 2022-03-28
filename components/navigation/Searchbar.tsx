import styled from "styled-components";
import {FC, useEffect, useState} from "react";
import Link from "next/link";
import { ProductType } from "../../types/Product";

const SearchResult:FC<{
    image: string;
    name: string;
    price: number;
    id: number;
}> = ({image, name, price, id}) => {
    return (
        <Link href={`/product/${id}`} passHref>
            <Result className="pointer border-secondary">
                <Image
                    alt=""
                    src={image}
                />
                <Body>
                    <Name className="text-primary">{name}</Name>
                    <Price className="text-primary">$ {price/100}</Price>
                </Body>
            </Result>
        </Link>
    )
}

const Searchbar: FC<{}> = () => {
    const [search, setSearch] = useState<string>("")
    const [results, setResults] = useState<ProductType[]>([])


    useEffect(() => {
        if(search.length > 2){
            fetch(`http://localhost:3000/api/products?q=${search}&limit=3`).then(res => res.json()).then(data => {
                setResults(data)
            })
        }
    }, [search])
    return (
        <SearchbarWrapper>
            <SearchInput
                className="bg-primary text-secondary border-primary"
                isOpen={search.length > 2}
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                type="text"
            />
            <SearchResults
                className="border-primary bg-primary"
                isOpen={search.length > 2}
            >
                {results.length > 0 ? results.map(result => (
                    <SearchResult
                        key={result.id}
                        image={result.image}
                        name={result.name}
                        price={result.price}
                        id={result.id}
                   />
                )) : <ShowMore className="text-primary">No results</ShowMore>}
                {results.length > 3 ? <Link href={`/search?q=${search}`} passHref>
                    <ShowMore className="text-primary">Show more</ShowMore>
                </Link> : null}
            </SearchResults>
        </SearchbarWrapper>
    )
}

const SearchbarWrapper = styled.div`
    max-width: 500px;
    width: 100%;
    @media (max-width: 600px) {
        margin-left: 0;
        max-width: unset;
    }
    position: relative;
`;

const SearchInput = styled.input<{isOpen: boolean}>`
    padding: 15px;
    width: 100%;
    border-radius: ${props => props.isOpen ? "5px 5px 0 0" : "5px"};
`;

const SearchResults = styled.div<{isOpen: boolean}>`
    display: ${props => props.isOpen ? "block" : "none"};
    position: absolute;
    z-index: 12;
    width: 100%;
    top: 47px;
    border: 1px solid;
    border-top: none;
    left: 0;
    border-radius: ${props => props.isOpen ? "0 0 5px 5px" : "5px"};
`;

const ShowMore = styled.a`
    font-size: 1.1rem;
    opacity: .8;
    padding: 10px;
    display: block;
    text-align: center;
`;

// Search result styles

const Result = styled.div`
    display: flex;
    padding: 10px;
    border-bottom: 1px solid;
`;

const Image = styled.img`
    width: 50px;
    height: auto;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
`;

const Name = styled.h2`
    font-size: 1.1rem;
    font-weight: 500;
`;

const Price = styled.h3`
    font-size: 1.1rem;
    font-weight: 400;
`;



export default Searchbar;