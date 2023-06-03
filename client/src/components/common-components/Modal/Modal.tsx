import React, {Dispatch, PropsWithChildren, SetStateAction} from 'react';
import Button from "../Button/Button";

interface IModal extends PropsWithChildren {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ isOpen, setIsOpen, children }: IModal) => {
    return (
        <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black/50 ${isOpen ? 'flex justify-center items-center' : 'hidden'}`}>
            <div className="block bg-white pt-[45px] py-[20px] pb-[20px] min-w-[250px] relative">
                <Button
                    className='absolute top-[5px] right-[5px]'
                    onClick={() => setIsOpen(false)}
                >
                    X
                </Button>
                {children}
            </div>
        </div>
    );
};

export default Modal;