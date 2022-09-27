import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CadastrarUsuarioRequest {
    @IsString() readonly name?: string;
    @IsString() @IsEmail() @IsNotEmpty() readonly email: string
}