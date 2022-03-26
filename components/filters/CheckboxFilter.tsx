import styled from "styled-components"
// Types
import { FilterComponentType } from "../../types/Filter"

const CheckboxFilter = ({
    name, 
    value, 
    checked, 
    setFilter, 
    // index
}:FilterComponentType) => {
    const handleChange = () => {
        setFilter(old => {
            if(old.includes(value)) {
                return old.filter(item => item !== value)
            } else {
                return [...old, value]
            }
        });
    }

    return (
        <CheckboxWrapper>
            <input 
                type="checkbox" 
                value={value}
                name={value}    
                checked={checked}
                onChange={handleChange}
            />
            <Label>{name}</Label>
        </CheckboxWrapper>
    )
}

const CheckboxWrapper = styled.div`
    padding: 2.5px;
`;

const Label = styled.label`
    font-size: 1rem;
    margin-left: 5px;
`;

export default CheckboxFilter