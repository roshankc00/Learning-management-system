import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from 'database/db.connection';

@Module({
  imports: [TypeOrmModule.forRoot(datasourceOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
