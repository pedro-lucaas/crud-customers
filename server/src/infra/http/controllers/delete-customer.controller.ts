import { DeleteCustomerUseCase } from "@application/use-cases/delete-customer-use-case";
import { Controller, Delete, HttpException, Param } from "@nestjs/common";

@Controller('customers')
export class DeleteCustomerController {
  constructor(
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
  ) { }

  @Delete(':customerId')
  async handle(@Param('customerId') customerId: string) {
    try {
      await this.deleteCustomerUseCase.execute({ id: customerId });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}