
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, User as UserModel } from '@prisma/client';
import { UsuarioDTO } from './usuario.atualizarUsuarioDto';


@Controller('/user')
export class UsuarioController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('/cadastrar')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.criaUsuario(userData);
  }

  @Get('/buscar-por-id/:idUsuario')
  async buscarUsuario(@Param('idUsuario') idUsuario: string): Promise<UserModel> {

    return this.userService.buscaUsuario({ id: Number(idUsuario) });
  }

  @Get('/listar-todos')
  async buscarTodosOsUsuarios(): Promise<UserModel[]> {

    return this.userService.buscaTodosOsUsuarios();
  }

  @Patch('/atualizar/:id')
  update(@Param('id') id: string, @Body() atualizarUsuarioDto: UsuarioDTO) {
    return this.userService.atualizaUsuario(+id, atualizarUsuarioDto);
  }

  @Delete('/deletar/:id')
  remove(@Param('id') id: string) {
    return this.userService.deletaUsuario({ id: Number(id) });
  }

}