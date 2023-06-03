import {Model, Table, DataType, Column, Sequelize, HasMany} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import {Product} from "../product/product-model";
import {User} from "../users/users-model";

interface IDepartmentCreationAttrs {
    name: string
}

@Table({tableName: 'department'})
export class Department extends Model<Department, IDepartmentCreationAttrs> {
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    name: string

    @Column({type: DataTypes.INTEGER, allowNull: true, defaultValue: 0})
    countEmployee: number

    @HasMany(() => User)
    users: User[]

}