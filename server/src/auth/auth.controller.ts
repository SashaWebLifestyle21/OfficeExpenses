import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LoginAuthDto} from "./dto/login-auth.dto";
import {AuthService} from "./auth.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/registration')
    @UseInterceptors(FileInterceptor('image'))
    registration(@Body() userDto: CreateUserDto, @UploadedFile() image) {
        return this.authService.registration(userDto, image)
    }

    @Post('/login')
    login(@Body() userDto: LoginAuthDto) {
        console.log('login ', userDto)
        return this.authService.login(userDto)
    }

}
