import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from "./category-model";
import {UpdateCategoryDto} from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category) private categoryRepository: typeof Category) {
    }

    async createCategory(dto: CreateCategoryDto) {
        const category = await this.categoryRepository.create(dto)
        return category
    }

    async getCategoryAll() {
        const categories = await this.categoryRepository.findAll({include: {all: true}})
        return categories
    }

    async getCategoryById(id: number) {
        const category = await this.categoryRepository.findByPk(id)
        return category
    }

    async removeCategory(id: number) {
        const department = await this.categoryRepository.destroy({ where: { id } })
        return !!department
    }

    async updateCategory(dto: UpdateCategoryDto) {
        const category = await this.categoryRepository.update(
            {
                name: dto.name,
                limitSum: dto.limitSum
            },
            {
                where: { id: dto.id }
            }
        )
        if(category) {
            const updatedCategory = await this.categoryRepository.findOne({where: {id: dto.id}})
            return updatedCategory
        } else {
            throw new HttpException('Ошибка при редактировании категории', HttpStatus.NOT_FOUND);
        }
    }
}
