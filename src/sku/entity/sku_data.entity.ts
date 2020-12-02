import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SKU_LOG } from "./sku_log.entity";

@Entity()
export class SKU_DATA {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    sku_code: string;

    @Column()
    sku_name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    note: string;

    @OneToMany(() => SKU_LOG,sku_log => sku_log.sku_data)
    sku_log:SKU_LOG[];

}