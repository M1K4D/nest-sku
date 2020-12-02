import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SKU_LOG } from "./sku_log.entity";

@Entity()
export class SKU_DATA {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    sku: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column({ nullable: true })
    note: string;

    @OneToMany(() => SKU_LOG,sku_log => sku_log.sku_id)
    sku_log:SKU_LOG[];

}