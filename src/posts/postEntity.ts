import { Post } from "@prisma/client";

export class PostEntity implements Post{
    
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorId: number;
    viewCount: number;
    createdAt: Date;
    updateAt: Date;
    
}