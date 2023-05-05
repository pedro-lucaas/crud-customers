import { ListCustomersUseCase } from "@application/use-cases/list-customers-use-case";
import { Controller, Get, HttpException, Query } from "@nestjs/common";

@Controller('customers')
export class ListCustomersController {
  constructor(
    private readonly listCustomersUseCase: ListCustomersUseCase,
  ) { }

  @Get()
  async handle(@Query('page') page: number) {
    try {
      return await this.listCustomersUseCase.execute(page);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}