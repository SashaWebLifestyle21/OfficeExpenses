import {Model, Table, DataType, Column, Sequelize, BelongsTo, ForeignKey} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import {Category} from "../category/category-model";

interface IProductCreationAttrs {
    name: string
    price: number
    image: string
    categoryId: number
}

@Table({tableName: 'product'})
export class Product extends Model<Product, IProductCreationAttrs> {
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataTypes.STRING, unique: true, allowNull: false})
    name: string

    @Column({type: DataTypes.STRING, allowNull: false})
    price: number

    @Column({type: DataTypes.STRING, allowNull: false, defaultValue: ''})
    image: string

    @ForeignKey(() => Category)
    @Column({type: DataTypes.INTEGER})
    categoryId: number

    @BelongsTo(() => Category)
    category: Category

}