import React, {useEffect, useState} from 'react';
import Button from "../../components/common-components/Button/Button";
import UserItem from "../../components/common-components/userItem/UserItem";
import Modal from "../../components/common-components/Modal/Modal";
import UpdateUserForm from "../../containers/UpdateUserForm/UpdateUserForm";
import Container from "../../components/common-components/Container/Container";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {IUser} from "../../store/reducers/user/userSlice";
import {IProduct, updateProduct} from "../../store/reducers/products/productSlice";
import ProductItem from "../../components/common-components/ProductItem/ProductItem";
import Input from "../../components/common-components/Input/Input";
import FormImage from "../../components/common-components/FormImage/FormImage";
import Image from "../../components/common-components/Image/Image";
import {updateUser} from "../../store/reducers/users/usersSlice";
import {toast} from "react-toastify";

const UpdateProduct = () => {
    const dispatch = useAppDispatch()
    const { products } = useAppSelectors(state => state.productReducer)

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [image, setImage] = useState<any>(null)
    const [oldImage, setOldImage] = useState<any>(null)
    const [productForUpd, setProductForUpd] = useState<IProduct | null>(null)

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (!fileList) return;
        setImage(fileList[0]);
        setOldImage('')
    }

    const handleUpdate = () => {
        if(productForUpd) {
            const data = new FormData()
            data.append('id', productForUpd.id.toString())
            data.append('name', productForUpd.name)
            data.append('price', productForUpd.price.toString())
            if(!image) {
                data.append('image',oldImage)
            } else {
                data.append('image',image)
            }
            dispatch(updateProduct(data))
            setIsOpen(false)
            toast('Товар обновлен')
        }
    }

    useEffect(() => {
        console.log('sss')
        if(productForUpd) {
            setOldImage(productForUpd.image)
        }
    }, [productForUpd])

    return (
        <Container className={'bg-lightGrey'}>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            <div className={'flex items-center justify-center gap-x-[15px] gap-y-[20px] flex-wrap'}>
                {products && products.map(product => {
                    return <ProductItem product={product} setIsOpen={setIsOpen} setProductForUpd={setProductForUpd} />
                })}
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
                {productForUpd &&
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className={'flex flex-col items-center justify-between w-[70vw]'}
                    >
                        <FormImage onChange={handleImage} labelText={'Прикрепить фото'}/>
                        <div className={'object-cover max-w-[200px] flex'}>
                            {oldImage && (
                                <Image src={oldImage} alt={'user'} />
                            )}
                            {image && (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={image.name}
                                />
                            )}
                        </div>
                        <Input
                            type={'text'}
                            value={productForUpd.name}
                            onChange={e => setProductForUpd({...productForUpd, name: e.currentTarget.value})}
                            placeholder={'Название продукта'}
                            className={'mt-[30px]'}
                        />
                        <Input
                            type={'text'}
                            value={productForUpd.price}
                            onChange={e => setProductForUpd({...productForUpd, price: +e.currentTarget.value})}
                            placeholder={'Цена'}
                            className={'mt-[30px] mb-[20px]'}
                        />
                        <Button
                            onClick={handleUpdate}
                        >
                            Обновить
                        </Button>
                    </form>
                }
            </Modal>
        </Container>
    );
};

export default UpdateProduct;