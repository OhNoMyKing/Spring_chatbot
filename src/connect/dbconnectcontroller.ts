import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './dbconnectservice';

@Controller('database')
export class DatabaseController {
  constructor(private databaseService: DatabaseService) {}

  @Get('config')
  getConfig() {
    return this.databaseService.getDatabaseConfig();
  }
}
