import { Module } from '@nestjs/common';
import { DatabaseService } from './dbconnectservice';
import { DatabaseController } from './dbconnectcontroller';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
