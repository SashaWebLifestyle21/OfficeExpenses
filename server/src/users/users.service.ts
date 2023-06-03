import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "./users-model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {DepartmentService} from "../department/department.service";
import {FileService, FileType} from "../file/file.service";
import * as bcrypt from 'bcryptjs'
import {UpdateUserDto} from "./dto/update-user.dto";


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private departmentService: DepartmentService,
                private fileService: FileService) {
    }

    async createUser(dto: CreateUserDto, img) {
        const department = await this.departmentService.getDepartmentById(dto.departmentId)
        if(!department) {
            throw new UnauthorizedException({ message: 'Указаного отдела не существует' })
        }
        const imagePath = await this.fileService.createFile(FileType.IMAGE, img, 'USERS')
        const hashPassword = await bcrypt.hash(dto.password, 6)
        const user = await this.userRepository.create({...dto, password: hashPassword, image: imagePath})
        department.countEmployee += 1
        await department.save()
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: { all: true }})
        return users
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({where: { email }, include: { all: true } })
        return user
    }

    async getByUserId(id: number) {
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
        return user
    }

    async getById(id: number) {
        const user = await this.userRepository.findOne({where: {departmentId: id}, include: {all: true}})
        return user
    }

    async ban(id: number) {
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
        user.banned = !user.banned
        await user.save()
        return user
    }

    async removeUser(id: number) {
        const user = await this.userRepository.findOne({where: {id}})
        if(!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        const deletedUser = await this.userRepository.destroy({ where: { id } })
        if(!deletedUser) {
            throw new HttpException('Ошибка при удалении пользователя', HttpStatus.NOT_FOUND);
        }
        const department = await this.departmentService.getDepartmentById(user.departmentId)
        if(!department) {
            throw new HttpException('Отдел не найден', HttpStatus.NOT_FOUND);
        }
        department.countEmployee -= 1
        await department.save()
        return id
    }

    async updateUser(dto: UpdateUserDto, img) {
        const department = await this.departmentService.getDepartmentById(dto.departmentId)
        if(!department) {
            throw new UnauthorizedException({ message: 'Указаного отдела не существует' })
        }
        const user = await this.userRepository.findOne({where: {id: dto.id}})
        if(user.departmentId !== dto.departmentId) {
            const prevDepartment = await this.departmentService.getDepartmentById(user.departmentId)
            prevDepartment.countEmployee -= 1
            await prevDepartment.save()
        }
        const imagePath = await this.fileService.createFile(FileType.IMAGE, img, 'USERS')
        if(dto.password) {
            const hashPassword = await bcrypt.hash(dto.password, 6)
            await this.userRepository.update(
                {
                    email: dto.email,
                    firstName: dto.firstName,
                    patronymic: dto.patronymic,
                    lastName: dto.lastName,
                    phone: dto.phone,
                    role: dto.role,
                    password: hashPassword,
                    departmentId: dto.departmentId,
                    image: imagePath
                },
                {
                    where: {id: dto.id}
                }
            )
            department.countEmployee += 1
            await department.save()
            const updatedUser = await this.userRepository.findOne({where: {id: dto.id}, include: {all: true}})
            return updatedUser
        }
        await this.userRepository.update(
            {
                email: dto.email,
                firstName: dto.firstName,
                patronymic: dto.patronymic,
                lastName: dto.lastName,
                phone: dto.phone,
                role: dto.role,
                departmentId: dto.departmentId,
                image: imagePath
            },
            {
                where: {id: dto.id}
            }
        )
        department.countEmployee += 1
        await department.save()
        const updatedUser = await this.userRepository.findOne({where: {id: dto.id}, include: {all: true}})
        return updatedUser

    }
}
