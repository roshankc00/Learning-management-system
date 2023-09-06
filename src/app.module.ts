import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from 'database/db.connection';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(datasourceOptions), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
