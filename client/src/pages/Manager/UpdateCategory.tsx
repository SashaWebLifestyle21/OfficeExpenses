import React, {useState} from 'react';
import Button from "../../components/common-components/Button/Button";
import DepartmentItem from "../../components/common-components/DepartmentItem/DepartmentItem";
import Modal from "../../components/common-components/Modal/Modal";
import Input from "../../components/common-components/Input/Input";
import Container from "../../components/common-components/Container/Container";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import {IDepartment, updateDepartment} from "../../store/reducers/department/departmentSlice";
import {ICategory, updateCategory} from "../../store/reducers/category/categorySlice";
import CategoryItem from "../../components/common-components/CategoryItem/CategoryItem";
import {toast} from "react-toastify";

const UpdateCategory = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { categories } = useAppSelectors(state => state.categoryReducer)

    const [isOpen, setIsOpen] = useState(false)
    const [categoryForUpd, setCategoryForUpd] = useState<ICategory | null>(null)

    const handleUpdate = () => {
        if(categoryForUpd) {
            dispatch(updateCategory({
                id: categoryForUpd.id,
                name: categoryForUpd.name,
                limitSum: categoryForUpd.limitSum
            }))
            setIsOpen(false)
            toast('Категория обновлена')
        }
    }
    return (
        <Container className={'bg-lightGrey'}>
            <Button
                onClick={() => navigate(-1)}
                className={'m-[10px]'}
            >
                Назад
            </Button>
            <div className={'flex items-center justify-center gap-x-[15px] gap-y-[20px] flex-wrap'}>
                {categories.map(category => {
                    return <CategoryItem category={category} setCategoryForUpd={setCategoryForUpd} setIsOpen={setIsOpen} />
                })}
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                {categoryForUpd &&
                    <>
                        <Input
                            type={'text'}
                            value={categoryForUpd.name}
                            onChange={e => setCategoryForUpd({...categoryForUpd, name: e.currentTarget.value})}
                            placeholder={'Название категории'}
                            className={'mt-[30px]'}
                        />
                        <Input
                            type={'text'}
                            value={categoryForUpd.limitSum}
                            onChange={e => setCategoryForUpd({...categoryForUpd, limitSum: +e.currentTarget.value})}
                            placeholder={'Сумма'}
                            className={'mt-[30px]'}
                        />
                    </>
                }
                <div className={'mt-[10px]'}>
                    <Button onClick={handleUpdate}>Изменить</Button>
                </div>
            </Modal>
        </Container>
    );
};

export default UpdateCategory;