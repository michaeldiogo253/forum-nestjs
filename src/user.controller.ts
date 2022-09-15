
import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { User, User as UserModel } from '@prisma/client';


@Controller('user')
export class UsuarioController{
    constructor(
        private readonly userService: UserService
      ) {}

    @Post('/cadastrar')
    async signupUser(
      @Body() userData: { name?: string; email: string },
    ): Promise<UserModel> {
      return this.userService.criaUsuario(userData);
    }

    @Get('/buscar-por-id/:idUsuario')
    async buscarUsuario(@Param('idUsuario') idUsuario : string) : Promise<UserModel>{

        return this.userService.buscaUsuario({ id: Number(idUsuario) });
    }



}