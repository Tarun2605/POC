import { IsNotEmpty, IsString } from "class-validator";

export class CreateYtPostDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required.' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Description is required.' })
    description: string;
}
