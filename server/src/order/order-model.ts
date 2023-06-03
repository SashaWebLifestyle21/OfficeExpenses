import {Model, Table, DataType, Column, Sequelize, BelongsTo, ForeignKey} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import {Category} from "../category/category-model";
import { Product } from "src/product/product-model";
import {User} from "../users/users-model";

interface IOrderCreationAttrs {
    sum: number
    categoryId: number
    productId: number
    userId: number
}

@Table({tableName: 'order'})
export class Order extends Model<Order, IOrderCreationAttrs> {
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataTypes.INTEGER})
    sum: number

    @Column({type: DataTypes.BOOLEAN, defaultValue: false})
    isApproved: boolean

    @ForeignKey(() => Category)
    @Column({type: DataTypes.INTEGER})
    categoryId: number

    @ForeignKey(() => Product)
    @Column({type: DataTypes.INTEGER})
    productId: number

    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER})
    userId: number

    @ForeignKey(() => User)
    @Column({type: DataTypes.INTEGER, defaultValue: null})
    managerId: number

    @BelongsTo(() => Category)
    category: Category

    @BelongsTo(() => Product)
    product: Product

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => User)
    manager: User
}