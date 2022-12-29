import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "mongoose";
import { Repository } from "typeorm";
import { EmployeesEntity } from "@app/persistence/northwind-database/entities/employess.entity";
import { EmployeeDocument } from "@app/persistence/southwind-database/model/employee.schema";
import { Employee } from "../model/employee";

@Injectable()
export class EmployeeService {
    
    constructor(
        @InjectModel('Employee') private mongo: Model<EmployeeDocument>,
        @InjectRepository(EmployeesEntity) private postgres: Repository<EmployeesEntity>
    ) {}

    async countFromMongo() {
        return this.mongo.count().exec()
    } 

    async findAllFromPostgres() {
        return this.postgres.find()
    }

    async saveOnMongo(employee: Employee) {
        await new this.mongo(employee).save();
    }

}