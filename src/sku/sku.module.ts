import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { CATEGORY } from 'src/entity/category.entity';
import { SkuController } from './sku.controller';
import { categoryRepository, SkuLogRepository, SkuRepository } from './sku.repository';
import { SkuService } from './sku.service';

@Module({
  imports:[TypeOrmModule.forFeature([SkuRepository,SkuLogRepository,categoryRepository])],
  controllers: [SkuController],
  providers: [SkuService]
})
export class SkuModule {}
