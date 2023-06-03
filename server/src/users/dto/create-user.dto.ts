export class CreateUserDto {
    readonly email: string
    readonly password: string
    readonly firstName: string
    readonly patronymic: string
    readonly lastName: string
    readonly phone: string
    readonly role: string
    readonly departmentId: number
}