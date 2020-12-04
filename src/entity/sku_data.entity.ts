import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CATEGORY } from './category.entity';
import { SKU_LOG } from './sku_log.entity';

@Entity()
export class SKU_DATA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  quantity: number;

  @Column()
  price: string;

  @Column({ nullable: true })
  note: string;

  @OneToMany(() => SKU_LOG, (sku_log) => sku_log.sku_id)
  sku_log: SKU_LOG[];

  @ManyToOne(() => CATEGORY, (category_id) => category_id.id, { cascade: true })
  category_id: CATEGORY | number;
}
