import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class SkuCreateDto {

    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsOptional()
    note: string;
}

export class SkuUpdateDto {

    @IsString()
    @IsOptional()
    sku: string;

    @IsNumber()
    @IsOptional()
    quantity: number;

    @IsString()
    @IsOptional()
    price: string;

    @IsString()
    @IsOptional()
    note: string;
}
