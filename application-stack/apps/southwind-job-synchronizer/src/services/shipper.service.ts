import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "mongoose";
import { Repository } from "typeorm";
import { ShippersEntity } from "@app/persistence/northwind-database/entities/shippers.entity";
import { ShipperDocument } from "@app/persistence/southwind-database/model/shipper.schema";
import { Shipper } from "../model/shipper";

@Injectable()
export class ShipperService {
    
    constructor(
        @InjectModel('Shipper') private mongo: Model<ShipperDocument>,
        @InjectRepository(ShippersEntity) private postgres: Repository<ShippersEntity>
    ) {}

    async countFromMongo() {
        return this.mongo.count().exec()
    } 

    async findAllFromPostgres() {
        return this.postgres.find()
    }

    async saveOnMongo(shipper: Shipper) {
        await new this.mongo(shipper).save();
    }

}