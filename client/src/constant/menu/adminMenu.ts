import {IMenuItem} from "./model/menuType";

export const adminMenu: IMenuItem[] = [
    {
        path: '/createUser',
        name: 'Добавить сотрудника'
    },
    {
        path: '/updateUser',
        name: 'Редактировать сотрудников'
    },
    {
        path: '/createDepartment',
        name: 'Добавить отдел'
    },
    {
        path: '/updateDepartment',
        name: 'Редактировать отделы'
    },
]
