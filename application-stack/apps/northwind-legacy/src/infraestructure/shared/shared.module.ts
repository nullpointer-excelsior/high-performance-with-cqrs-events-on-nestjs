import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import databaseConfig from "./config/database.config";
import serverConfig from "./config/server.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            load: [
                databaseConfig,
                serverConfig
            ],
            validationSchema: Joi.object({
                SERVER_PORT: Joi.number().default(3000),
                POSTGRES_DATABASE_HOST: Joi.string().default('localhost'),
                POSTGRES_DATABASE_PORT: Joi.number().default(5432),
                POSTGRES_DATABASE_NAME: Joi.string().required(),
                POSTGRES_DATABASE_USER: Joi.string().required(),
                POSTGRES_DATABASE_PASSWORD: Joi.string().required(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: false,
            },
        })
    ]
})
export class SharedModule {

}