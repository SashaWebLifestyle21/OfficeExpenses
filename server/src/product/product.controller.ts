import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ProductService} from "./product.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {UpdateDepartmentDto} from "../department/dto/update-department.dto";
import {UpdateProductDto} from "./dto/update-product.dto";

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() productDto: CreateProductDto, @UploadedFile() image) {
        return this.productService.createProduct(productDto, image)
    }

    @Get()
    getAll() {
        return this.productService.getAllProduct()
    }

    @Get(':id')
    get(@Param('id') id: number) {
        return this.productService.getProductById(id)
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.productService.removeProduct(id)
    }

    @Put()
    @UseInterceptors(FileInterceptor('image'))
    update(@Body() productDto: UpdateProductDto, @UploadedFile() image) {
        return this.productService.updateProduct(productDto, image)
    }
}
