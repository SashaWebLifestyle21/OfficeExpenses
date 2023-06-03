import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Category} from "../category/category-model";
import {Product} from "../product/product-model";
import {FileModule} from "../file/file.module";
import {CategoryModule} from "../category/category.module";
import {User} from "../users/users-model";
import {UsersModule} from "../users/users.module";
import {ProductModule} from "../product/product.module";
import {Order} from "./order-model";

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    SequelizeModule.forFeature([Category, Product, User, Order]),
    CategoryModule,
    UsersModule,
    ProductModule
  ]
})
export class OrderModule {}
