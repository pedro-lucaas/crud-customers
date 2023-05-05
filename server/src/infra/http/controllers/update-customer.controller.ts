import { UpdateCustomerUseCase } from "@application/use-cases/update-customer-use-case";
import { Body, Controller, HttpException, Param, Put } from "@nestjs/common";

@Controller('customers')
export class UpdateCustomerController {
  constructor(
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
  ) { }

  @Put(':customerId')
  async handle(@Param('customerId') customerId: string, @Body() body: any) {
    try {
      await this.updateCustomerUseCase.execute({ id: customerId, ...body });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}