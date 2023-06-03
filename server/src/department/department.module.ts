import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import {UsersService} from "../users/users.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users-model";
import {Department} from "./department-model";

@Module({
  providers: [DepartmentService],
  controllers: [DepartmentController],
  imports: [
    SequelizeModule.forFeature([Department]),
  ],
  exports: [DepartmentService]
})
export class DepartmentModule {}
