import React, {useState} from 'react';
import Title from "../../components/common-components/Title/Title";
import Input from "../../components/common-components/Input/Input";
import Button from "../../components/common-components/Button/Button";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {createCategory} from "../../store/reducers/category/categorySlice";
import Label from "../../components/common-components/Label/Label";
import FormImage from "../../components/common-components/FormImage/FormImage";
import {createProduct} from "../../store/reducers/products/productSlice";
import {toast} from "react-toastify";

const CreateProductForm = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [categoryId, setCategoryId] = useState<number>(0)
    const [image, setImage] = useState<any>(null)

    const dispatch = useAppDispatch()
    const { categories } = useAppSelectors(state => state.categoryReducer)

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (!fileList) return;
        setImage(fileList[0]);
    }

    const handleCreateProduct = () => {
        const data = new FormData()
        data.append('name', name)
        data.append('price', price.toString())
        data.append('image', image)
        data.append('categoryId', categoryId.toString())
        dispatch(createProduct(data))
        toast('Товар создан')
    }
    return (
        <div className={'shadow-lg py-[65px] px-[61px] bg-white'}>
            <Title className={'text-center'}>Новый товар</Title>
            <form
                className={'flex items-center justify-center flex-col gap-y-[20px]'}
                onSubmit={(e) => e.preventDefault()}
            >
                <FormImage onChange={handleImage} labelText={'Прикрепить фото'}/>
                <div className={'object-cover max-w-[200px]'}>
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                        />
                    )}
                </div>
                <Input
                    type={'text'}
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    placeholder={'Название товара'}
                />
                <Input
                    type={'text'}
                    value={price}
                    onChange={e => setPrice(+e.currentTarget.value)}
                    placeholder={'Цена'}
                />
                <Label>
                    Категория
                    <select
                        value={categoryId}
                        onChange={event => setCategoryId(+event.currentTarget.value)}
                    >
                        {categories.map(category => {
                            return <option value={category.id}>{category.name}</option>
                        })}
                    </select>
                </Label>
                <Button onClick={handleCreateProduct}>Добавить</Button>
            </form>
        </div>
    );
};

export default CreateProductForm;