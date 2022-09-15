import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from './prisma.service';
import { UsuarioController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UsuarioController, PostController],
  providers: [UserService, PostService, PrismaService],
})
export class AppModule {}
