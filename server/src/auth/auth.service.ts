import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcryptjs'
import {LoginAuthDto} from "./dto/login-auth.dto";
import {User} from "../users/users-model";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {
    }

    async registration(userDto: CreateUserDto, image: string) {
        const candidate = await this.usersService.getByEmail(userDto.email)
        if(candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 6)
        const createdUser = await this.usersService.createUser({...userDto, password: hashPassword}, image)
        const user = await this.usersService.getByEmail(createdUser.email)
        const token = await this.generateToken(user)
        return {
            user,
            token: token.token,
            message:'Пользователь создан'
        }
    }

    async login(userDto: LoginAuthDto) {
        const user = await this.validateUser(userDto)
        const token = await this.generateToken(user)
        return {
            user,
            token: token.token,
            message:'Пользователь авторизован'
        }
    }

    private async validateUser(userDto: LoginAuthDto) {
        const user = await this.usersService.getByEmail(userDto.email)
        if(!user) {
            throw new UnauthorizedException({ message: 'Некорректный email' })
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(!passwordEquals) {
            throw new UnauthorizedException({ message: 'Некорректный пароль' })
        }
        if(user && passwordEquals) {
            return user
        }
    }

    private async generateToken(user: User) {
        const payload = {
            email: user.email,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            patronymic: user.patronymic,
            phone: user.phone,
            role: user.role
        }

        return {
            token: this.jwtService.sign(payload)
        }
    }

}
