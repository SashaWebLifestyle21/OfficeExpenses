import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {
    }

    @Post()
    create(@Body() categoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(categoryDto)
    }

    @Get()
    getAll() {
        return this.categoryService.getCategoryAll()
    }

    @Get(':id')
    get(@Param('id') id: number) {
        return this.categoryService.getCategoryById(id)
    }

    @Delete()
    delete(@Param(':id') id: number) {
        return this.categoryService.removeCategory(id)
    }

    @Put()
    update(@Body() categoryDto: UpdateCategoryDto) {
        return this.categoryService.updateCategory(categoryDto)
    }
}
