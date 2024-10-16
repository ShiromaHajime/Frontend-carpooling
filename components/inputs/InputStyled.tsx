import { useState } from "react";
import { Input } from "./Input"
import { PropsInput } from "@/types/types";
import { useColorScheme } from "nativewind";

export const InputStyled = ({ setValueInput, valueInput, placeholder, className }: PropsInput) => {

    const [value, setValue] = useState(valueInput);
    const { colorScheme } = useColorScheme();

    const handleSetValue = (value: string) => {
        setValueInput(value)
        setValue(value)
    }

    return (
        <Input
            className={`focus:border focus:border-slate-900 
            ${(colorScheme == 'dark' ? 'dark:focus:border-gray-400' : '')}
            ${className}`}

            value={value}
            onChange={(e) => handleSetValue(e.nativeEvent.text)}
            placeholder={placeholder}
        />
    )
}