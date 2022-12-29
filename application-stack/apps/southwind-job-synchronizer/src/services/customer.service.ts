import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "mongoose";
import { Repository } from "typeorm";
import { CustomersEntity } from "@app/persistence/northwind-database/entities/customer.entity";
import { CustomerDocument } from "@app/persistence/southwind-database/model/customer.schema";
import { Customer } from "../model/customer";

@Injectable()
export class CustomerService {
    
    constructor(
        @InjectModel('Customer') private mongo: Model<CustomerDocument>,
        @InjectRepository(CustomersEntity) private postgres: Repository<CustomersEntity>
    ) {}

    async countFromMongo() {
        return this.mongo.count().exec()
    } 

    async findAllFromPostgres() {
        return this.postgres.find()
    }

    async saveOnMongo(customer: Customer) {
        await new this.mongo(customer).save();
    }

}