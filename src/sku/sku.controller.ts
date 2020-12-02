import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { identity } from 'rxjs';
import { SkuCreateDto, SkuUpdateDto } from './dto/sku.dto';
import { SkuService } from './sku.service';

@Controller('sku')
@UsePipes(new ValidationPipe())
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

    @Patch(':id/updatesku')
    async updateSku(@Param('id', ParseIntPipe) id, @Body() body: SkuUpdateDto) {
        return this.skuService.updateSku(id,body)
    }

    @Get('getallentity')
    async getAllEntity() {
        return this.skuService.findALL()
    }

    @Delete(':id/deletesku')
    async deleteSku(@Param('id',ParseIntPipe)id){
        return this.skuService.deleteSku(id)
    }
}
