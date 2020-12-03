import { CATEGORY } from "src/entity/category.entity";
import { SKU_LOG } from "src/entity/sku_log.entity";
import { EntityRepository, Repository } from "typeorm";
import { SKU_DATA } from "../entity/sku_data.entity";

@EntityRepository(SKU_DATA)
export class SkuRepository extends Repository<SKU_DATA> {}
@EntityRepository(SKU_LOG)
export class SkuLogRepository extends Repository<SKU_LOG> {}
@EntityRepository(CATEGORY)
export class categoryRepository extends Repository<CATEGORY> {}