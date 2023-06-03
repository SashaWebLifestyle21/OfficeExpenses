import React, {Dispatch, SetStateAction} from 'react';
import {IProduct} from "../../../store/reducers/products/productSlice";
import {ICategory} from "../../../store/reducers/category/categorySlice";
import Image from "../Image/Image";
import Title from "../Title/Title";
import Text from "../Text/Text";

interface IProductItem {
    product: IProduct
    className?: string
    setIsOpen?: Dispatch<SetStateAction<boolean>>
    setProductForUpd?: Dispatch<SetStateAction<IProduct | null>>
}

const ProductItem = ({ product, setProductForUpd, className, setIsOpen }: IProductItem) => {
    const handleClickItem = () => {
        setIsOpen && setIsOpen(true)
        setProductForUpd && setProductForUpd(product)
    }
    return (
        <div className={`rounded-2xl border-2 bg-white border-solid border-[#E7E7E7] p-[15px] flex items-center 
        justify-center gap-x-[10px] cursor-pointer hover:bg-secondary ${className ? className : ''}`}
             onClick={handleClickItem}
        >
            <div>
                <Image
                    src={product.image}
                    alt={product.name}
                    className={'w-[150px] h-[150px]'}
                />
            </div>
            <div>
                <Title>{product.name}</Title>
                <Text>Цена: {product.price}</Text>
            </div>
        </div>
    );
};

export default ProductItem;