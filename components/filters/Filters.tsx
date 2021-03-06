import { FC, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
// Context
import { useUserContext } from "../../context/contextProvider";
// Icons
import FilterIcon from '@mui/icons-material/FilterAlt';
// Types
import CheckboxFilter from "./CheckboxFilter";
import { Center } from "../../styles/styles";

const categoryLabels = [
    "Laptops",
    "Mobile phones",
    "Tablets"
]

const categoryValues = [
    "laptop",
    "phone",
    "tablet",
]

const Filters:FC<{
    categories: string[],
    setCategories: Dispatch<SetStateAction<string[]>>,
    priceRange: { min: number, max: number },
    setPriceRange: Dispatch<SetStateAction<{ min: number, max: number }>>
}> = ({
    categories, 
    setCategories, 
    priceRange, 
    setPriceRange
}) => {
    const {theme} = useUserContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (    
        <FiltersWrapper>
            <FiltersTop>
                <FilterTitle color={theme.textPrimary}>Filter products by</FilterTitle>
                <FilterIconWrapper onClick={() => setIsOpen(old => !old)}>
                    <FilterIcon 
                        sx={{
                            color: theme.textPrimary,
                            fontSize: 28
                        }}
                    />
                </FilterIconWrapper>  
            </FiltersTop>
            <FiltersBottom isOpen={isOpen}>
                <FilterWrapper>
                    <FilterName color={theme.textPrimary}>Category</FilterName>
                    {categoryLabels.map((category, index) => (
                        <CheckboxFilter
                            key={index}
                            name={category}
                            value={categoryValues[index]}
                            checked={categories.includes(categoryValues[index])}
                            setFilter={setCategories}
                        />
                    ))}
                </FilterWrapper>
                <FilterWrapper>
                    <FilterName color={theme.textPrimary}>Price range</FilterName>
                    <PriceFilter>
                        <Input
                            placeholder="0"
                            type="number"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(old => ({ ...old, min: parseInt(e.target.value)}))}
                        />
                        <Dash>-</Dash>
                        <Input
                            placeholder="0"
                            type="number"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(old => ({ ...old, max: parseInt(e.target.value)}))}
                        />
                    </PriceFilter>
                </FilterWrapper>
            </FiltersBottom>
        </FiltersWrapper>
    )
}

const FilterTitle = styled.h2<{color: string;}>`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${props => props.color};
`;

const FiltersWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const FiltersTop = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 920px) {
        justify-content: space-between;
    }
`;

const FilterIconWrapper = styled.div`
    @media (min-width: 920px) {
        display: none;
    }
`;

const FiltersBottom = styled.div<{ isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media (max-width: 920px) {
        display: ${props => props.isOpen ? "flex" : "none"};
    }
`;

const FilterName = styled.h3<{color: string;}>`
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${props => props.color};
`;

const Dash = styled.p`
    margin: 0 5px;
    font-size: 1rem;
    opacity: .6;
`;

const Input = styled.input`
    padding: 5px;
    width: 100px;
`;

const PriceFilter = styled(Center)`
    justify-content: flex-start;
`;

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 920px) {
        // flex-direction: row;
        // align-items: center;
        ${FilterName} {
            margin-bottom: 5px;
        }
        margin: 0;
    }
`;

export default Filters;