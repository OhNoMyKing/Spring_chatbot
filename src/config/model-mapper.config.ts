import { Module } from "@nestjs/common";
import * as ModelMapper from 'model-mapper'
@Module({
    providers:[
        {
            provide: 'ModelMapper',
            useValue: ModelMapper,
        },
    ],
    exports: ['ModelMapper'],
})
export class ModelMapperConfigModule{
    constructor(){
        console.log(typeof(ModelMapper));
    }
}