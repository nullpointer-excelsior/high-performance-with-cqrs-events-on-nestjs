import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "mongoose";
import { Repository } from "typeorm";
import { ProductEntity } from "@app/persistence/northwind-database/entities/product.entity";
import { ProductDocument } from "@app/persistence/southwind-database/model/product.schema";
import { ProductRepository } from "../../../core/domain/ports/outbound/ProductRepository";
import { Product } from "../../../core/domain/Product";

@Injectable()
export class ProductrepositoryAdapter implements ProductRepository {

    constructor(
        @InjectModel('Product') private mongo: Model<ProductDocument>,
        @InjectRepository(ProductEntity) private postgres: Repository<ProductEntity>
    ) { }

    async findById(id: number): Promise<Product> {
        return await this.mongo
            .findOne({ productId: id })
            .exec()
            .then(doc => doc? this.map(doc): null);
    }


    async updateStock(productId: number, unitsInStock: number, unitsOnOrder: number): Promise<void> {
        await this.postgres
            .createQueryBuilder()
            .update(ProductEntity)
            .set({
                unitsInStock: unitsInStock,
                unitsOnOrder: unitsOnOrder
            })
            .where('productId =:productId', { productId: productId })
            .execute()
    }

    map(doc: ProductDocument) {
        const p = new Product()
        p.productId = doc.productId
        p.productName = doc.productName
        p.discontinued = doc.discontinued
        // p.quantityPerUnit = 10
        p.unitPrice = doc.unitPrice
        p.unitsInStock = doc.unitsInStock
        p.unitsOnOrder = doc.unitsOnOrder
        return p
    }

}