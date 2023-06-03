import React from 'react';
import Label from "../Label/Label";
import Text from "../Text/Text";

interface IFormImage {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    labelText?: string
}

const FormImage = ({ onChange, labelText }: IFormImage) => {
    return (
        <Label className='p-[10px] flex items-center justify-center border-2 border-dotted cursor-pointer'>
            <Text>{labelText}</Text>
            <input
                type='file'
                className='hidden'
                onChange={onChange}
                name='img'
            />
        </Label>
    );
};

export default FormImage;