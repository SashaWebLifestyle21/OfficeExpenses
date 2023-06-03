import {Model, Table, DataType, Column, Sequelize, HasMany} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import {Product} from "../product/product-model";

interface ICategoryCreationAttrs {
    name: string
    limitSum: number
}

@Table({tableName: 'category'})
export class Category extends Model<Category, ICategoryCreationAttrs> {
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    name: string

    @Column({type: DataTypes.INTEGER, allowNull: false})
    limitSum: number

    @HasMany(() => Product)
    products: Product[]

}