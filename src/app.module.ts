import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orm_config } from './orm.config';
import { SkuModule } from './sku/sku.module';

@Module({
  imports: [SkuModule,TypeOrmModule.forRoot(orm_config)],
  controllers: [],
  providers: [],
})
export class AppModule {}
