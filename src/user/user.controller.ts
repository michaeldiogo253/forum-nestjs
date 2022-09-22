
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
import { CadastrarUsuarioRequest } from './cadastrar-usuario.response';


@Controller('/user')
export class UsuarioController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('/cadastrar')
  async signupUser(
    @Body() cadastrarUsuarioRequest: CadastrarUsuarioRequest,
  ): Promise<UserModel> {
    return this.userService.criaUsuario(cadastrarUsuarioRequest);
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

  @Get('relatorio-usuario-posts/:idUser')
    async findRelatorioDeTodosOsPosts(@Param('idUser') idUser: string ) {

        return await this.userService.findRelatorioDeTodosOsPosts(Number(idUser));

    }

}