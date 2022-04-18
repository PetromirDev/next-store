import { Dispatch, SetStateAction } from "react";

export type FilterType = {
    name: string; 
    value: string;
    checked: boolean;
}

export type FilterComponentType = {
    name: string; 
    value: string;
    checked: boolean;
    setFilter: Dispatch<SetStateAction<string[]>>;
}