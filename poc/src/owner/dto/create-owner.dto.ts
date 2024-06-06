import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateOwnerDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required.' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail()
    email: string;
}
