import styled from "styled-components"
// CONTEXT API
import { useUserContext } from "../../context/contextProvider"
// Types
import { FilterComponentType } from "../../types/Filter"

const CheckboxFilter = ({
    name, 
    value, 
    checked, 
    setFilter, 
}:FilterComponentType) => {
    const {theme} = useUserContext();
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
            <Label color={theme.textSecondary}>{name}</Label>
        </CheckboxWrapper>
    )
}

const CheckboxWrapper = styled.div`
    padding: 2.5px;
`;

const Label = styled.label<{color: string;}>`
    font-size: 1rem;
    margin-left: 5px;
    color: ${props => props.color};
`;

export default CheckboxFilter