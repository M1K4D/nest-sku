import { NotFoundException } from "@nestjs/common";
import { CATEGORY } from "src/entity/category.entity";
import { SKU_LOG } from "src/entity/sku_log.entity";
import { EntityRepository, Repository } from "typeorm";
import { SKU_DATA } from "../entity/sku_data.entity";

@EntityRepository(SKU_DATA)
export class SkuRepository extends Repository<SKU_DATA> {
    async getProductById(id: number): Promise<SKU_DATA> {
        try {
          const data = await this.findOne({
            where: { id: id },
          });
          if (!data) throw new Error('not found id.');
    
          return data;
        } catch (error) {
          console.log(error.message);
          throw new NotFoundException(error.message);
        }
      }
}
@EntityRepository(SKU_LOG)
export class SkuLogRepository extends Repository<SKU_LOG> {}
@EntityRepository(CATEGORY)
export class categoryRepository extends Repository<CATEGORY> {}