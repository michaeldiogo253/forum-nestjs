import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';
import { AtualizarPostDTO } from './post.atualizarPost.DTO';

@Controller()
export class PostController {
    constructor(
        private readonly postService: PostService,
    ) { }

    @Get('post/:id')
    async getPostById(@Param('id') id: string): Promise<PostModel> {
        return await this.postService.post({ id: Number(id) });
    }

    @Get('feed')
    async getPublishedPosts(): Promise<PostModel[]> {
        return await this.postService.posts({
            where: { published: true },
        });
    }

    @Get('filtered-posts/:searchString')
    async getFilteredPosts(
        @Param('searchString') searchString: string,
    ): Promise<PostModel[]> {
        return await this.postService.posts({
            where: {
                OR: [
                    {
                        title: { contains: searchString },
                    },
                    {
                        content: { contains: searchString },
                    },
                ],
            },
        });
    }

    @Post('post')
    async createDraft(
        @Body() postData: { title: string; content?: string; authorEmail: string },
    ): Promise<PostModel> {
        const { title, content, authorEmail } = postData;
        return await this.postService.createPost({
            title,
            content,
            author: {
                connect: { email: authorEmail },
            },
        });
    }


    @Put('publish/:id')
    async publishPost(@Param('id') id: string): Promise<PostModel> {
        return await this.postService.updatePost({
            where: { id: Number(id) },
            data: { published: true },
        });
    }

    @Delete('post/:id')
    async deletePost(@Param('id') id: string): Promise<PostModel> {
        return await this.postService.deletePost({ id: Number(id) });
    }

    @Get('find-post-by-author-id/:authorId')
    async findPostByAuthorId(@Param('authorId') authorId: string) {

        return await this.postService.findPostByAuthorId(Number(authorId));

    }

    @Get('find-all-posts')
    async findAllPosts(): Promise<PostModel[]> {

        return await this.postService.findAllPosts();

    }

    @Put('update-content-post/:idPost')
    async atualizarPost(@Param('idPost') idPost: string, @Body() dto: AtualizarPostDTO) {

        return await this.postService.updatePost({
            where: { id: Number(idPost) },
            data: {
                title: dto.title,
                content: dto.content
            },
        });
    }

}