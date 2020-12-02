import { Entity, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SKU_DATA } from "./sku_data.entity";

@Entity()
export class SKU_LOG {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true })
    sku: string;

    @Column({ nullable: true })
    quantity: number;

    @Column({ nullable: true })
    price: number;

    @Column({ nullable: true })
    note: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => SKU_DATA, sku_id => sku_id.id)
    sku_id: SKU_DATA;

}