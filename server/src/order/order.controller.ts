import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateOrderDto} from "./dto/create-order.dto";
import {OrderService} from "./order.service";
import {ApproveManagerDto} from "./dto/approve-manager.dto";

@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {
    }

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.orderService.createOrder(dto)
    }

    @Get()
    getAll() {
        return this.orderService.getOrdersAll()
    }

    @Post('/approve')
    approve(@Body() dto: ApproveManagerDto) {
        return this.orderService.approveManager(dto)
    }
}
