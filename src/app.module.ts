import { Module } from '@nestjs/common';
import { SkuModule } from './sku/sku.module';

@Module({
  imports: [SkuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
