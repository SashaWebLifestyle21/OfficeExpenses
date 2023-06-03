import React, {useState} from 'react';
import Title from "../../components/common-components/Title/Title";
import Input from "../../components/common-components/Input/Input";
import Button from "../../components/common-components/Button/Button";
import {useAppDispatch} from "../../hooks/redux";
import {createCategory} from "../../store/reducers/category/categorySlice";
import {toast} from "react-toastify";

const CreateCategoryForm = () => {
    const [name, setName] = useState('')
    const [limitSum, setLimitSum] = useState(0)
    const dispatch = useAppDispatch()

    const handleCreateCategory = () => {
        dispatch(createCategory({
            name,
            limitSum
        }))
        toast('Категория создана')
    }

    return (
        <div className={'shadow-lg py-[65px] px-[61px] bg-white'}>
            <Title className={'text-center'}>Новая категория расходов</Title>
            <form
                className={'flex items-center justify-center flex-col gap-y-[20px]'}
                onSubmit={(e) => e.preventDefault()}
            >
                <Input
                    type={'text'}
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    placeholder={'Название категории'}
                />
                <Input
                    type={'text'}
                    value={limitSum}
                    onChange={e => setLimitSum(+e.currentTarget.value)}
                    placeholder={'Сумма для расходов'}
                />
                <Button onClick={handleCreateCategory}>Добавить</Button>
            </form>
        </div>
    );
};

export default CreateCategoryForm;