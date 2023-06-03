import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() userDto: CreateUserDto, @UploadedFile() image) {
        return this.usersService.createUser(userDto, image)
    }

    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.usersService.getById(id)
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.usersService.removeUser(id)
    }

    @Put()
    @UseInterceptors(FileInterceptor('image'))
    update(@Body() userDto: UpdateUserDto, @UploadedFile() image) {
        return this.usersService.updateUser(userDto, image)
    }

    @Post('/ban')
    ban(@Body() dto: {id: number}) {
        return this.usersService.ban(dto.id)
    }
}
