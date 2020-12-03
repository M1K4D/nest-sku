import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { SkuController } from './sku.controller';
import { categoryRepository, SkuLogRepository, SkuRepository } from '../repository/sku.repository';
import { SkuService } from './sku.service';

@Module({
  imports:[TypeOrmModule.forFeature([SkuRepository,SkuLogRepository,categoryRepository])],
  controllers: [SkuController],
  providers: [SkuService]
})
export class SkuModule {}
