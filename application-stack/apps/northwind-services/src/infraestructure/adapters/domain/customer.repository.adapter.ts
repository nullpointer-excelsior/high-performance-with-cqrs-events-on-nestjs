import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CustomerDocument } from "@app/persistence/southwind-database/model/customer.schema";
import { Customer } from "../../../core/domain/Customer";
import { CustomerRepository } from "../../../core/domain/ports/outbound/CustomerRepository";

@Injectable()
export class CustomerRepositoryAdapter implements CustomerRepository {
    
    constructor(@InjectModel('Customer') private mongo: Model<CustomerDocument>) {}

    async findById(id: number): Promise<Customer> {
        return this.mongo
            .findOne({ customerId: id })
            .exec()
            .then(doc => ({
                customerId: doc.customerId,
                companyName: doc.companyName,
                address: doc.address,
                city: doc.city,
                contactName: doc.contactName,
                contactTitle:doc.contactTitle,
                country: doc.country,
                fax: doc.fax,
                phone: doc.phone,
                postalCode: doc.postalCode,
                region: doc.region
            }));
    }

    

}