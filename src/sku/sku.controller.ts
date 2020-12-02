import { Body, Controller, Get, Post } from '@nestjs/common';
import { SkuCreateDto } from './dto/sku.dto';
import { SkuService } from './sku.service';

@Controller('sku')
export class SkuController {
    constructor(private skuService: SkuService) { }
    @Get('getsku')
    async getsku() {
        return this.skuService.getSku();
    }

    @Post('addsku')
    async addsku(@Body() body: SkuCreateDto) {
        return this.skuService.addSKU(body)
    }
}
