import { IsString } from "class-validator";

export class CadastrarUsuarioRequest{
    @IsString() readonly name?: string; 
    @IsString() readonly email: string
}