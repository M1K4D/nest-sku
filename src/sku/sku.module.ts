import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { SkuController } from './sku.controller';
import { SkuRepository } from './sku.repository';
import { SkuService } from './sku.service';

@Module({
  imports:[TypeOrmModule.forFeature([SkuRepository])],
  controllers: [SkuController],
  providers: [SkuService]
})
export class SkuModule {}
