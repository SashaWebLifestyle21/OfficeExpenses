import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Category} from "../category/category-model";
import {Product} from "./product-model";
import {FileModule} from "../file/file.module";
import {CategoryModule} from "../category/category.module";

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
      SequelizeModule.forFeature([Category, Product]),
      FileModule,
      CategoryModule
  ],
    exports: [
        ProductService
    ]
})
export class ProductModule {}
