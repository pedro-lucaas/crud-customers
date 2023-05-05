import { CreateCustomerUseCase } from "@application/use-cases/create-customer-use-case";
import { Body, Controller, HttpException, Post } from "@nestjs/common";

@Controller('customers')
export class CreateCustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
  ) { }

  @Post()
  async handle(@Body() body: any) {
    try {
      await this.createCustomerUseCase.execute(body);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}