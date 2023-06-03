import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./product-model";
import {CreateProductDto} from "./dto/create-product.dto";
import {FileService, FileType} from "../file/file.service";
import {UpdateDepartmentDto} from "../department/dto/update-department.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {CategoryService} from "../category/category.service";

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product) private productRepository: typeof Product,
                private fileService: FileService,
                private categoryService: CategoryService) {
    }

    async createProduct(dto: CreateProductDto, img) {
        const category = await this.categoryService.getCategoryById(dto.categoryId)
        if(!category) {
            throw new UnauthorizedException({ message: 'Указаной категории не существует' })
        }
        const imagePath = await this.fileService.createFile(FileType.IMAGE, img, 'PRODUCTS')
        const product = await this.productRepository.create({...dto, categoryId: category.id ,image: imagePath})
        return product
    }

    async getAllProduct() {
        const products = await this.productRepository.findAll()
        return products
    }


    async getProductById(id: number) {
        const product = await this.productRepository.findByPk(id)
        return product
    }

    async removeProduct(id: number) {
        const product = await this.productRepository.destroy({ where: { id } })
        return !!product
    }

    async updateProduct(dto: UpdateProductDto, img) {
        const imagePath = await this.fileService.createFile(FileType.IMAGE, img, 'PRODUCTS')
        const product = await this.productRepository.update(
            {
                name: dto.name,
                price: dto.price,
                image: imagePath
            },
            {
                where: { id: dto.id }
            }
        )
        if(product) {
            const updatedProduct = await this.productRepository.findOne({where: {id: dto.id}})
            return updatedProduct
        } else {
            throw new HttpException('Ошибка при редактировании продукта', HttpStatus.NOT_FOUND);
        }
    }
}
