import React, {HTMLInputTypeAttribute} from 'react';


interface IInput {
    type: HTMLInputTypeAttribute
    name?: string
    value: string | number
    placeholder?: string
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FormEvent<HTMLInputElement>) => void
    className?: string
}

const Input = ({ type, name, value, placeholder, onChange, onBlur, className }: IInput) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            className={`border-2 border-solid border-grey p-[5px] rounded-[5px] transition duration-300 ease-linear
            focus:outline-none hover:bg-lightGrey focus:border-secondary ${className ? className : ''}`}
        />
    );
};

export default Input;