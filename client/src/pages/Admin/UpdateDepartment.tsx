import React, {useState} from 'react';
import Container from "../../components/common-components/Container/Container";
import Button from "../../components/common-components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelectors} from "../../hooks/redux";
import DepartmentItem from "../../components/common-components/DepartmentItem/DepartmentItem";
import Modal from "../../components/common-components/Modal/Modal";
import {IUser} from "../../store/reducers/user/userSlice";
import {IDepartment, updateDepartment} from "../../store/reducers/department/departmentSlice";
import Input from "../../components/common-components/Input/Input";
import {toast} from "react-toastify";

const UpdateDepartment = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { departments } = useAppSelectors(state => state.departmentReducer)

    const [isOpen, setIsOpen] = useState(false)
    const [departmentForUpd, setDepartmentForUpd] = useState<IDepartment | null>(null)

    const handleUpdate = () => {
       if(departmentForUpd) {
           dispatch(updateDepartment({
               id: departmentForUpd.id,
               name: departmentForUpd.name
           }))
           setIsOpen(false)
           toast('Отдел обновлен')
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
                {departments.map(department => {
                    return <DepartmentItem department={department} setDepartmentForUpd={setDepartmentForUpd} setIsOpen={setIsOpen} />
                })}
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                {departmentForUpd && <Input
                    type={'text'}
                    value={departmentForUpd.name}
                    onChange={e => setDepartmentForUpd({...departmentForUpd, name: e.currentTarget.value})}
                    placeholder={'Email'}
                    className={'mt-[30px]'}
                />
                }
                <div className={'mt-[10px]'}>
                    <Button onClick={handleUpdate}>Изменить</Button>
                </div>
            </Modal>
        </Container>
    );
};

export default UpdateDepartment;