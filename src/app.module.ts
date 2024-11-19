import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelMapperConfigModule } from './config/model-mapper.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './connect/connectdbmodule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { CartItemModule } from './modules/cart-item/cart-item.module';
import { RelatedImageModule } from './modules/related-image/related-image.module';
import { RatingModule } from './modules/rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        entities: [__dirname + '/../database/entities/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
        subscribers: [],
      }),
      inject: [ConfigService],
    }),
    RatingModule,
    UserModule,
    RoleModule,
    CartModule,
    ProductModule,
    CategoryModule,
    CartItemModule,
    RelatedImageModule,
    DatabaseModule,
    ModelMapperConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
