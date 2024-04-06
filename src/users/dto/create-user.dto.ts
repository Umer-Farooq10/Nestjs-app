import { IsString, IsEmail, IsEnum } from "class-validator";

export class createUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['ADMIN', 'ENGINEER', 'INTERN'])
    role: string
}

// enum Role {
//     ADMIN = 'ADMIN',
//     ENGINEER = 'ENGINEER',
//     INTERN = 'INTERN'
// }
