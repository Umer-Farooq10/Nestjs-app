import { IsString, IsEmail, IsEnum } from "class-validator";

export class createUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(Role)
    role: Role
}

enum Role {
    ADMIN = 'ADMIN',
    ENGINEER = 'ENGINEER',
    INTERN = 'INTERN'
}
