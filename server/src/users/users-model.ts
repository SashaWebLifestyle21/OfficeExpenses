import {Model, Table, DataType, Column, Sequelize, ForeignKey, BelongsTo} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import {Department} from "../department/department-model";

interface IUserCreationAttrs {
    email: string
    password: string
    firstName: string
    lastName: string
    patronymic: string
    phone: string
    departmentId: number
    image: string
    role: string
}

@Table({tableName: 'user'})
export class User extends Model<User, IUserCreationAttrs> {
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataTypes.STRING, allowNull: false})
    password: string

    @Column({type: DataTypes.STRING, allowNull: false})
    firstName: string

    @Column({type: DataTypes.STRING, allowNull: false})
    patronymic: string

    @Column({type: DataTypes.STRING, allowNull: false})
    lastName: string

    @Column({type: DataTypes.STRING, allowNull: true, defaultValue: ''})
    phone: string

    @Column({type: DataTypes.STRING, allowNull: false, defaultValue: ''})
    image: string

    @Column({type: DataTypes.STRING, allowNull: true, defaultValue: 'USER'})
    role: string

    @Column({type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false})
    banned: boolean

    @Column({type: DataTypes.STRING, allowNull: true, defaultValue: ''})
    banReason: string

    @ForeignKey(() => Department)
    @Column({type: DataTypes.INTEGER})
    departmentId: number

    @BelongsTo(() => Department)
    department: Department
}