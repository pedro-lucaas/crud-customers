import { ListCustomersUseCase } from "@application/use-cases/list-customers-use-case";
import { Controller, Get, HttpException, ParseIntPipe, Query } from "@nestjs/common";
import { CustomerViewModel } from "../view-models/customers-view-model";

@Controller('customers')
export class ListCustomersController {
  constructor(
    private readonly listCustomersUseCase: ListCustomersUseCase,
  ) { }

  @Get()
  async handle(@Query('page', new ParseIntPipe()) page: number) {
    try {
      const { customers } = await this.listCustomersUseCase.execute(page);

      return {
        ...customers,
        items: customers.items.map(CustomerViewModel.toHttp)
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}