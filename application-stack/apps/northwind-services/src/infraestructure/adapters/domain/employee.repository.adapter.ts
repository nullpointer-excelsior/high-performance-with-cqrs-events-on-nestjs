import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmployeeDocument } from "@app/persistence/southwind-database/model/employee.schema";
import { Employee } from "../../../core/domain/Employee";
import { EmployeeRepository } from "../../../core/domain/ports/outbound/EmployeeRepository";

@Injectable()
export class EmployeeRepositoryAdapter implements EmployeeRepository {
    
    constructor(@InjectModel('Employee') private model: Model<EmployeeDocument>) { }

    async findById(id: number): Promise<Employee> {
        return this.model
            .findOne({ employeeId: id })
            .exec()
            .then(doc => ({
                address: doc.address,
                birthDate: doc.birthDate,
                city: doc.city,
                country: doc.country,
                employeeId: doc.employeeId,
                extension: doc.extension,
                firstName: doc.firstName,
                hireDate: doc.hireDate,
                homePhone: doc.homePhone,
                lastName: doc.lastName,
                notes: doc.notes,
                photoPath: doc.photoPath,
                postalCode: doc.postalCode,
                region: doc.region,
                reportsTo: doc.reportsTo,
                title: doc.title,
                titleOfCourtesy: doc.titleOfCourtesy
            }));
    }

   


}