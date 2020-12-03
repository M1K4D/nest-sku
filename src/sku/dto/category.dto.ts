import { IsNotEmpty, IsString } from "class-validator";

export class categoryCreateDto{
    @IsString()
    @IsNotEmpty()
    category_name: string;
}