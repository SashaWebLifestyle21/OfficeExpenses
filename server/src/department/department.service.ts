import {HttpException, HttpStatus, Injectable, Post} from '@nestjs/common';
import {CreateDepartmentDto} from "./dto/create-department.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users/users-model";
import {Department} from "./department-model";
import {UpdateDepartmentDto} from "./dto/update-department.dto";

@Injectable()
export class DepartmentService {

    constructor(@InjectModel(Department) private departmentRepository: typeof Department) {
    }

    async createDepartment(dto: CreateDepartmentDto) {
        const department = await this.departmentRepository.create(dto)
        return department
    }

    async getDepartmentById(id: number) {
        const department = await this.departmentRepository.findByPk(id)
        return department
    }

    async getDepartmentAll() {
        const departments = await this.departmentRepository.findAll()
        return departments
    }

    async removeDepartment(id: number) {
        const department = await this.departmentRepository.destroy({ where: { id } })
        return !!department
    }

    async updateDepartment(dto: UpdateDepartmentDto) {
        const department = await this.departmentRepository.update(
            {
                name: dto.name
            },
            {
                where: { id: dto.id }
            }
        )
        if(department) {
            const updatedDepartment = await this.departmentRepository.findOne({where: {id: dto.id}})
            return updatedDepartment
        } else {
            throw new HttpException('Ошибка при редактировании отдела', HttpStatus.NOT_FOUND);
        }
    }
}
