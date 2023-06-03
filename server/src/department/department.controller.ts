import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateDepartmentDto} from "./dto/create-department.dto";
import {DepartmentService} from "./department.service";
import {UpdateDepartmentDto} from "./dto/update-department.dto";

@Controller('department')
export class DepartmentController {
    constructor(private departmentService: DepartmentService) {
    }

    @Post()
    create(@Body() departmentDto: CreateDepartmentDto) {
        return this.departmentService.createDepartment(departmentDto)
    }

    @Get(':id')
    get(@Param('id') id: number) {
        return this.departmentService.getDepartmentById(id)
    }

    @Get()
    getAll() {
        return this.departmentService.getDepartmentAll()
    }

    @Delete()
    delete(@Param(':id') id: number) {
        return this.departmentService.removeDepartment(id)
    }

    @Put()
    update(@Body() departmentDto: UpdateDepartmentDto) {
        return this.departmentService.updateDepartment(departmentDto)
    }
}
