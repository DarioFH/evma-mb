import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

    @IsEmail()
    readonly login: string;

    @IsNotEmpty()
    readonly pass: string;
}