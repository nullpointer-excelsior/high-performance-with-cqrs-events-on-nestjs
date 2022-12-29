import { Injectable } from "@nestjs/common";
import { Shipper } from "../../../core/domain/Shipper";
import { ShipperRepository } from "../../../core/domain/ports/outbound/ShipperRepository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ShipperDocument } from "@app/persistence/southwind-database/model/shipper.schema";

@Injectable()
export class ShipperRepositoryAdapter implements ShipperRepository {
    
    constructor(@InjectModel('Shipper') private model: Model<ShipperDocument>) {}

    async findById(id: number): Promise<Shipper> {
        return this.model
            .findOne({ shipperId: id })
            .exec()
            .then(doc => ({
                shipperId: doc.shipperId,
                companyName: doc.companyName,
                phone: doc.phone
            }));
    }

}