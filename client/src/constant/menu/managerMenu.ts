import {IMenuItem} from "./model/menuType";

export const managerMenu: IMenuItem[] = [
    {
        path: '/createUser',
        name: 'Добавить сотрудника'
    },
    {
        path: '/updateUser',
        name: 'Редактировать сотрудников'
    },
    {
        path: '/createCategory',
        name: 'Добавить категорию расходов'
    },
    {
        path: '/updateCategory',
        name: 'Редактировать категории расходов'
    },
    {
        path: '/createProduct',
        name: 'Добавить товар'
    },
    {
        path: '/updateProduct',
        name: 'Обновить товар'
    },
    {
        path: '/orders',
        name: 'Просмотр заявок'
    },
    // {
    //     path: '/reportByUser',
    //     name: 'Отчет по пользователям'
    // },
    // {
    //     path: '/reportByCategory',
    //     name: 'Отчет по категориям'
    // },
]
