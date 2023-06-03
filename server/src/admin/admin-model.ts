import {Model, Table, DataType, Column, Sequelize, BelongsTo, ForeignKey} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import {User} from "../users/users-model";


@Table({tableName: 'admin'})
export class Admin extends Model<Admin> {
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER})
    userId: number
}