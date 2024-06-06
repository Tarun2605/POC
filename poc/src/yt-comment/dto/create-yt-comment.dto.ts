import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty({ message: 'comment is required.' })
    comment: string;

    @IsString()
    @IsNotEmpty({ message: 'Post ID is required.' })
    postId: string;  
}
