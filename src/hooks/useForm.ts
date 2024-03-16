import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";

interface TUseForm<T> {
    values: T;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    setValues: Dispatch<SetStateAction<T>>;
}

export function useForm<T> (inputValues: T): TUseForm<T> {
    const [values, setValues] = useState<T>(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault();

        const { value, name } = event.target as HTMLInputElement | HTMLTextAreaElement;
        setValues(values => ({...values, [name]: value}));
    };
    return {values, handleChange, setValues};
}
