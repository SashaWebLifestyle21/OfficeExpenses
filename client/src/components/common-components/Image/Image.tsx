import React from "react";
import {BASE_SERVER_URL} from "../../../constant/BASE_SERVER_URL";

interface IImage {
    src: string;
    alt: string;
    className?: string;
    onClick?: () => void
}

const Image = ({ src, alt, className, onClick }: IImage) => {
    return (
        <img
            onClick={onClick}
            src={`${BASE_SERVER_URL}${src}`}
            alt={alt}
            className={className}
        />
    );
};

export default Image;
