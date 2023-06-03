import {HttpException, HttpStatus, Injectable, Post} from '@nestjs/common';
import {CreateOrderDto} from "./dto/create-order.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "../product/product-model";
import {FileService} from "../file/file.service";
import {CategoryService} from "../category/category.service";
import {Order} from "./order-model";
import {ProductService} from "../product/product.service";
import {UsersService} from "../users/users.service";
import {ApproveManagerDto} from "./dto/approve-manager.dto";

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order,
                private categoryService: CategoryService,
                private productService: ProductService,
                private userService: UsersService) {
    }

    async createOrder(dto: CreateOrderDto) {
        console.log('DTO ', dto)
        const user = await this.userService.getByUserId(dto.userId)
        if(!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        const category = await this.categoryService.getCategoryById(dto.categoryId)
        if(!category) {
            throw new HttpException('Категория не найдена', HttpStatus.NOT_FOUND);
        }
        const product = await this.productService.getProductById(dto.productId)
        if(!product) {
            throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
        }
        if(category.limitSum - dto.sum > 0) {
            const order = await this.orderRepository.create(dto, {include: {all: true}})
            return order
        } else {
            throw new HttpException('Превышен лимит по сумме', HttpStatus.FORBIDDEN);
        }
    }

    async getOrdersAll() {
        const orders = await this.orderRepository.findAll({include: {all: true}})
        return orders
    }

    async approveManager(dto: ApproveManagerDto) {
        const order = await this.orderRepository.findOne({where: {id: dto.id}, include: {all: true}})
        if(!order) {
            throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
        }
        order.managerId = dto.managerId
        order.isApproved = dto.isApproved
        await order.save()
        const category = await this.categoryService.getCategoryById(order.categoryId)
        if(category.limitSum > order.sum) {
            category.limitSum -= order.sum
            await category.save()
        } else {
            throw new HttpException('Превышен лимит по сумме', HttpStatus.FORBIDDEN);
        }
        return order
    }



}
