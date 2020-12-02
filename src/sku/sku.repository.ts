import { EntityRepository, Repository } from "typeorm";
import { SKU_DATA } from "../entity/sku_data.entity";

@EntityRepository(SKU_DATA)
export class SkuRepository extends Repository<SKU_DATA> {}