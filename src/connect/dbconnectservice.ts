import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DatabaseService{
    constructor(private configService : ConfigService){}
    getDatabaseConfig(){
        // const host = this.configService.get<string>('DATABASE_HOST');
        // const port = this.configService.get<number>('DATABASE_PORT');
        // const user = this.configService.get<string>('DATABASE_USER');
        // const password = this.configService.get<string>('DATABASE_PASSWORD');
        const host = process.env.DATABASE_HOST;
        const port = Number(process.env.DATABASE_PORT);
        const user = process.env.DATABASE_USER;
        const password = process.env.DATABASE_PASSWORD;
        const host2 = process.env.DATABASE_HOST;
        return {
          host,
          port,
          user,
          password,
          host2
        };
    }
}