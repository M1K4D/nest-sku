import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
// @Optional()
export class SkuCreateDto {
    @IsString()
    sku_code: string;

    @IsString()
    sku_name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;

    @IsString()
    note: string;

}