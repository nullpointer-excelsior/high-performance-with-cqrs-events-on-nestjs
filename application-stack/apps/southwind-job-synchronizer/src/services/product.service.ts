import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "mongoose";
import { Repository } from "typeorm";
import { ProductEntity } from "@app/persistence/northwind-database/entities/product.entity";
import { Product } from "../model/product";
import { ProductDocument } from "@app/persistence/southwind-database/model/product.schema";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private mongo: Model<ProductDocument>,
        @InjectRepository(ProductEntity) private postgres: Repository<ProductEntity>
    ) {}

    async countFromMongo() {
        return this.mongo.count().exec()
    } 

    async findAllFromPostgres() {
        return this.postgres.find()
    }

    async saveOnMongo(product: Product) {
        await new this.mongo(product).save();
    }

}