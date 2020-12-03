import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SKU_DATA } from './sku_data.entity';

@Entity()
export class CATEGORY {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @OneToMany(() => SKU_DATA, (sku_category) => sku_category.category)
  sku_category: SKU_DATA[];
}
