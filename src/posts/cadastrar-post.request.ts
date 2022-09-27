import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CadastrarPostRequest {


    @IsString() @IsNotEmpty() title: string;
    @IsNotEmpty() content?: string;
    @IsEmail() @IsNotEmpty() authorEmail: string
}