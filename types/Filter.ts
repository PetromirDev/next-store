import { Dispatch, SetStateAction } from "react";

export interface FilterType {
    name: string; 
    value: string;
    checked: boolean;
}

export interface FilterComponentType {
    name: string; 
    value: string;
    checked: boolean;
    // index: number;
    setFilter: Dispatch<SetStateAction<string[]>>;
}