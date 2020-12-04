import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { SkuCreateDto, SkuUpdateDto } from './dto/sku.dto';
import { SKU_DATA } from '../entity/sku_data.entity';
import { SKU_LOG } from '../entity/sku_log.entity';
import {
  categoryRepository,
  SkuLogRepository,
  SkuRepository,
} from '../repository/sku.repository';
import { CATEGORY } from 'src/entity/category.entity';

@Injectable()
export class SkuService {
  constructor(
    private readonly skuRepository: SkuRepository,
    private readonly skulogRepository: SkuLogRepository,
    private readonly categoryRepository: categoryRepository,
  ) {}

  async createSKU(body: SkuCreateDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let err = '';
    const { sku, quantity, price, note, category_name } = body;

    const sku_data = new SKU_DATA();
    const sku_log = new SKU_LOG();
    const category = new CATEGORY();
    try {
      sku_data.sku = sku;
      sku_data.quantity = quantity;
      sku_data.price = price;
      sku_data.note = note;

      const find_cat = await this.categoryRepository.findOne({
        where: { category_name: category_name },
      });
      if (category_name && !find_cat) {
        category.category_name = category_name;
        await queryRunner.manager.save(category);
        sku_data.category_id = category;
      } else if (category_name && find_cat) {
        sku_data.category_id = find_cat;
      } else {
        const find_cat = await this.categoryRepository.findOne({
          where: { category_name: "uncategory" },
        });
        sku_data.category_id = find_cat;
      }
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

  async getSku(query: any) {
    try {
      const { sku, price } = query;
      if (sku || price) {
        const query = await getConnection()
          .getRepository(SKU_DATA)
          .createQueryBuilder('skudata')
          .innerJoinAndSelect('skudata.category_id','category_id');
        if (sku) {
          query.andWhere('skudata.sku ilike :sku', { sku: `%${sku}%` });
        }
        if (price) {
          query.andWhere('skudata.price ilike :price', { price: `%${price}%` });
        }
        const find = await query.getMany();
        return {
          success: true,
          data: find,
        };
      } else {
        const find = await this.skuRepository.find({relations:['category_id']});
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

  async updateSku(id: number, body: SkuUpdateDto) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let err = '';
    try {
      const { sku, quantity, price, note, category_name } = body;
      const found = await this.skuRepository.findOne({ where: { id: id } });
      const sku_log = new SKU_LOG();
      const category = new CATEGORY();
      if (!found) throw new Error('not found sku code.');
      if (found.quantity + quantity < 0) throw new Error(`quantity not enough`);

      const find = await this.categoryRepository.findOne({
        where: { category_name: category_name },
      });
      if (category_name && !find) {
        category.category_name = category_name;
        await queryRunner.manager.save(category);
        await getConnection()
          .createQueryBuilder()
          .update(SKU_DATA)
          .set({
            sku: sku,
            quantity: found.quantity + quantity,
            price: price,
            note: note,
            category_id: category,
          })
          .where('id = :id', { id: found.id })
          .execute();
      } else if (category_name && find) {
        await getConnection()
          .createQueryBuilder()
          .update(SKU_DATA)
          .set({
            sku: sku,
            quantity: found.quantity + quantity,
            price: price,
            note: note,
            category_id: find,
          })
          .where('id = :id', { id: found.id })
          .execute();
      } else {
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
      }
      sku_log.sku_id = found;
      sku_log.sku = sku;
      sku_log.price = price;
      sku_log.note = note;
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
        .innerJoinAndSelect('skudata.sku_log', 'sku_log')
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

  async init(): Promise<void> {
    try {
      const find = await this.categoryRepository.findOne({
        where: { category_name: 'uncategory' },
      });

      if (!find) {
        const _category = new CATEGORY();
        _category.category_name = 'uncategory';
        await _category.save();
      }
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }
}
