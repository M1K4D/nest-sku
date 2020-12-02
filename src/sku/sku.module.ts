import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { SkuController } from './sku.controller';
import { SkuLogRepository, SkuRepository } from './sku.repository';
import { SkuService } from './sku.service';

@Module({
  imports:[TypeOrmModule.forFeature([SkuRepository,SkuLogRepository])],
  controllers: [SkuController],
  providers: [SkuService]
})
export class SkuModule {}
