import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users-model";
import {AuthModule} from "../auth/auth.module";
import {DepartmentModule} from "../department/department.module";
import {Department} from "../department/department-model";
import {FileModule} from "../file/file.module";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Department]),
    forwardRef(() => AuthModule),
    DepartmentModule,
    FileModule
  ],
  exports: [UsersService]
})
export class UsersModule {}
