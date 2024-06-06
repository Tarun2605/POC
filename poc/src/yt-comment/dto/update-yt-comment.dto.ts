import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateCommentDto {
    @IsString()
    @IsOptional()
    comment?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
