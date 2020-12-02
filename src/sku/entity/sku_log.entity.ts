import { Entity, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SKU_DATA } from "./sku_data.entity";

@Entity()
export class SKU_LOG {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    sku_name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    note: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => SKU_DATA, sku_data => sku_data.sku_code)
    sku_data: SKU_DATA;

}