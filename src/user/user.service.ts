import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma, Post } from '@prisma/client';
import { UsuarioDTO } from './usuario.atualizarUsuarioDto';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async buscaUsuario(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const usuario = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!usuario) {
      throw new NotFoundException("Usuario não encontrado");
    }

    return usuario;
  }

  async buscaUsuarios(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async buscaTodosOsUsuarios(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async criaUsuario(data: Prisma.UserCreateInput): Promise<User> {

    const usuario = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (usuario) {
      throw new Error("Email já esta vinculado a outro usuario...")
    }

    return this.prisma.user.create({
      data,
    });
  }

  async atualizaUsuario(id: number, updateDto: UsuarioDTO): Promise<User> {
    //const { where, data } = params;
    const usuarioAtualizado = this.prisma.user.update({
      where: { id },
      data: updateDto,
    });

    return usuarioAtualizado;

  }


  async deletaUsuario(where: Prisma.PostWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async findRelatorioDeTodosOsPosts(userId: number): Promise<(User & {
    posts: Post[];
  })[]> {
    const relatorio = await this.prisma.user.findMany({
      where: {
        id: userId
      },
      include: {
        posts: true
      }
    });

    return relatorio;

  }

}