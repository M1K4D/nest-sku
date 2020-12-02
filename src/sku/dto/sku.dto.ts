import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
// @Optional()
export class SkuCreateDto {
    @IsString()
    @IsNotEmpty()
    sku_code: string;

    @IsString()
    @IsNotEmpty()
    sku_name: string;

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