import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EmployeesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
