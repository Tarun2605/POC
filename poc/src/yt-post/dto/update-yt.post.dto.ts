import { IsOptional, IsString } from "class-validator";

export class UpdateYtPostDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
