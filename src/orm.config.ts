import { TypeOrmModule } from "@nestjs/typeorm";

export const orm_config: TypeOrmModule = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "123456",
    "database": "sku_2",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    // logging: false
}