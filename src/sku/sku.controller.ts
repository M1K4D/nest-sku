import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IsString } from 'class-validator';
import { categoryCreateDto } from './dto/category.dto';
import { SkuCreateDto, SkuUpdateDto } from './dto/sku.dto';
import { SkuService } from './sku.service';

@Controller('sku')
@UsePipes(new ValidationPipe())
export class SkuController {
  constructor(private skuService: SkuService) {}
  @Get('getsku')
  async getsku(@Query() query) {
    return this.skuService.getSku(query);
  }

  @Post('createsku')
  async createSku(@Body() body: SkuCreateDto) {
    return this.skuService.createSKU(body);
  }

  @Patch(':id/updatesku')
  async updateSku(@Param('id', ParseIntPipe) id, @Body() body: SkuUpdateDto) {
    return this.skuService.updateSku(id, body);
  }

  @Get('getallentity')
  async getAllEntity() {
    return this.skuService.findALL();
  }

  @Delete(':id/deletesku')
  async deleteSku(@Param('id', ParseIntPipe) id) {
    return this.skuService.deleteSku(id);
  }

  @Get('getlogs')
  async Getlogs() {
    return this.skuService.getLogs();
  }

  @Get(':id/logsbyid')
  async getLogsById(@Param('id', ParseIntPipe) id) {
    return this.skuService.getLogsById(id);
  }

  @Post('createcategory')
  async createCategory(@Body() body: categoryCreateDto) {
    return this.skuService.createCategory(body);
  }
}
