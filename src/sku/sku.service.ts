import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { SkuCreateDto, SkuUpdateDto } from './dto/sku.dto';
import { SKU_DATA } from '../entity/sku_data.entity';
import { SKU_LOG } from '../entity/sku_log.entity';
import { SkuLogRepository, SkuRepository } from './sku.repository';

@Injectable()
export class SkuService {
  constructor(
    private readonly skuRepository: SkuRepository,
    private readonly skulogRepository: SkuLogRepository,
  ) {}
  async getSku(query: any) {
    try {
      const { sku, price } = query;
      if (sku) {
        const find = await getConnection()
          .getRepository(SKU_DATA)
          .createQueryBuilder('skudata')
          .select()
          .where('skudata.sku ilike :sku', { sku: `%${sku}%` })
          .orWhere('skudata.price ilike :price', { price: `%${price}%` })
          .getMany();
        return {
          success: true,
          data: find,
        };
      } else {
        const find = await this.skuRepository.find();
        return {
          success: true,
          data: find,
        };
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
    const { sku, quantity, price, note } = body;

    const sku_data = new SKU_DATA();
    const sku_log = new SKU_LOG();
    // test
    try {
      sku_data.sku = sku;
      sku_data.quantity = quantity;
      sku_data.price = price;
      sku_data.note = note;
      await queryRunner.manager.save(sku_data);

      sku_log.sku = sku;
      sku_log.quantity = quantity;
      sku_log.price = price;
      sku_log.note = note;
      sku_log.sku_id = sku_data;
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
      };
    }
  }
  async updateSku(id: number, body: SkuUpdateDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let err = '';
    try {
      const { sku, quantity, price, note } = body;
      const found = await this.skuRepository.findOne({ where: { id: id } });
      const sku_log = new SKU_LOG();
      if (!found) throw new Error('not found sku code.');
      if (found.quantity + quantity < 0) throw new Error(`quantity not enough`);
      sku_log.sku_id = found;
      await getConnection()
        .createQueryBuilder()
        .update(SKU_DATA)
        .set({
          sku: sku,
          quantity: found.quantity + quantity,
          price: price,
          note: note,
        })
        .where('id = :id', { id: found.id })
        .execute();
      sku_log.quantity = quantity;

      await queryRunner.manager.save(sku_log);
      try {
        await queryRunner.commitTransaction();
      } catch (error) {
        console.log('error message ::', error.message);
        await queryRunner.rollbackTransaction();
        err = error.message;
      } finally {
        await queryRunner.release();
        if (err) console.log(err);
        return {
          success: true,
          message: 'updated success',
        };
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: error.message,
      });
    }
  }

  async findALL() {
    try {
      const skus = await getConnection()
        .getRepository(SKU_DATA)
        .createQueryBuilder('skudata')
        .leftJoinAndSelect('skudata.sku_log', 'sku_log')
        .getMany();

      if (!skus) throw new Error(`not found`);
      return {
        success: true,
        data: skus,
      };
    } catch (error) {
      throw new NotFoundException({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteSku(id: number) {
    try {
      const found = await this.skuRepository.findOne({ where: { id: id } });

      if (!found) throw new Error(`id ${id} not found`);
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(SKU_LOG)
        .where('sku_id = :sku_id', { sku_id: id })
        .execute();

      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(SKU_DATA)
        .where('id = :id', { id: id })
        .execute();
      return {
        success: true,
        message: `delete id ${id} sucess`,
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: error.message,
      });
    }
  }

  async getLogs() {
    const find = await this.skulogRepository.find();
    return {
      success: true,
      data: find,
    };
  }

  async getLogsById(id: number) {
    const found = await this.skulogRepository.find({ where: { sku_id: id } });
    return {
      sucess: true,
      data: found,
    };
  }

//   async search(query: any) {
//     try {
//       const { sku, price } = query;
//       const found = await getConnection()
//         .getRepository(SKU_DATA)
//         .createQueryBuilder('skudata')
//         .select()
//         .where('skudata.sku ilike :sku', { sku: `%${sku}%` })
//         .orWhere('skudata.price ilike :price', { price: `%${price}%` })
//         .getMany();

//       return {
//         sucess: true,
//         data: found,
//       };
//     } catch (error) {
//       throw new BadRequestException({
//         success: false,
//         message: error.message,
//       });
//     }
//   }
}
