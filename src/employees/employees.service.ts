import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({ data: createEmployeeDto });
  }

  async findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    if (role && !['ADMIN', 'ENGINEER', 'INTERN'].includes(role)) {
      throw new HttpException({ message: 'Invalid role provided.' }, HttpStatus.BAD_REQUEST);
    }

    let employees: Prisma.EmployeeCreateInput[];
    if (role) {
        employees = await this.databaseService.employee.findMany({ where: { role } });
    } else {
        employees = await this.databaseService.employee.findMany();
    }

    if (employees.length === 0) {
        throw new NotFoundException(`No employees found`)
    }

    return employees;
  }

  async findOne(id: number) {
    const employee = await this.databaseService.employee.findUnique({ where: { id } })
    console.log(employee)
    if(!employee) {
      throw new NotFoundException('Employee not found')
    }
    return employee
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeCreateInput) {
    try {
      return await this.databaseService.employee.update({ where: { id }, data: updateEmployeeDto });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        // The employee does not exist
        throw new NotFoundException('Employee does not exist')
        // throw new HttpException({
        //   message: 'Employee does not exist',
        //   error: 'error',
        //   statusCode: HttpStatus.NOT_FOUND,
        // }, HttpStatus.NOT_FOUND);
      } else {
        // Rethrow the error if it's not a PrismaClientKnownRequestError with code P2025
        throw error;
      }
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.employee.delete({ where: { id } })
      // return { message: 'Employee successfully deleted.' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Employee does not exist')
      } else {
        throw error;
      }
    }
  }
}
