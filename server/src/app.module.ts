import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users-model";
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import {Admin} from "./admin/admin-model";
import {Manager} from "./manager/manager-model";
import { ProductModule } from './product/product.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import {Product} from "./product/product-model";
import {Category} from "./category/category-model";
import { DepartmentModule } from './department/department.module';
import {Department} from "./department/department-model";
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OrderModule } from './order/order.module';
import * as path from "path";
import {Order} from "./order/order-model";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Admin, Manager, Product, Category, Department, Order],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    AdminModule,
    ManagerModule,
    ProductModule,
    CategoryModule,
    DepartmentModule,
    FileModule,
    OrderModule,
  ],
  controllers: [AppController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
