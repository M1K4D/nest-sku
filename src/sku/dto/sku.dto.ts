import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
// @Optional()
export class SkuCreateDto {

    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

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

    @IsNumber()
    @IsOptional()
    price: number;

    @IsString()
    @IsOptional()
    note: string;
}