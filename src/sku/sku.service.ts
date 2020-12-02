import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { SkuCreateDto } from './dto/sku.dto';
import { SKU_DATA } from './entity/sku_data.entity';
import { SKU_LOG } from './entity/sku_log.entity';
import { SkuRepository } from './sku.repository';

@Injectable()
export class SkuService {
    constructor(private readonly skuRepository:SkuRepository){}
    async getSku() {
        try {
            const find = this.skuRepository.find()
            const data = [...await find]
            return {
                success: true,
                data: data
            }
        } catch (error) {
            console.log('error message ::', error.message);
            throw new NotFoundException({
                success: false,
                message: error.message,
            });
        }
    }

    async addSKU(body: SkuCreateDto) {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let err = '';
        const { sku_code, sku_name, quantity, price, note } = body;
        const find = await this.skuRepository.findOne({ where: { sku_code: sku_code } })
        if (find) {
            return {
                success: false,
                message: `sku code ${sku_code} is duplicate`
            }
        }

        const sku_data = new SKU_DATA();
        const sku_log = new SKU_LOG();
        // test
        try {
            sku_data.sku_code = sku_code;
            sku_data.sku_name = sku_name;
            sku_data.quantity = quantity;
            sku_data.price = price;
            sku_data.note = note;
            await queryRunner.manager.save(sku_data);

            sku_log.sku_name = sku_name;
            sku_log.quantity = quantity;
            sku_log.price = price;
            sku_log.note = note;
            await queryRunner.manager.save(sku_log);
            await queryRunner.commitTransaction();
        } catch (error) {
            console.log('error message ::', error.message);
            await queryRunner.rollbackTransaction();
            err = error.message;
        } finally {
            await queryRunner.release();
            if (err)
                throw new BadRequestException({
                    success: false,
                    message: err,
                });
            return {
                success: true,
                message: 'add success',
            }

        }
    }
}
