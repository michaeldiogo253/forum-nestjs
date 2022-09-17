import { Module } from '@nestjs/common';
import { PostController } from './posts/post.controller';
import { PostService } from './posts/post.service';
import { PrismaService } from './prisma.service';
import { UsuarioController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [UsuarioController, PostController],
  providers: [UserService, PostService, PrismaService],
})
export class AppModule {}
