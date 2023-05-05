import { Module } from "@nestjs/common";
import { CreateCustomerController } from "./controllers/create-customer.controller";
import { CreateCustomerUseCase } from "@application/use-cases/create-customer-use-case";
import { DatabaseModule } from "@infra/database/database.module";
import { DeleteCustomerController } from "./controllers/delete-customer.controller";
import { DeleteCustomerUseCase } from "@application/use-cases/delete-customer-use-case";
import { UpdateCustomerController } from "./controllers/update-customer.controller";
import { UpdateCustomerUseCase } from "@application/use-cases/update-customer-use-case";
import { ListCustomersController } from "./controllers/list-customers.controller";
import { ListCustomersUseCase } from "@application/use-cases/list-customers-use-case";


@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    CreateCustomerController,
    DeleteCustomerController,
    UpdateCustomerController,
    ListCustomersController
  ],
  providers: [
    CreateCustomerUseCase,
    DeleteCustomerUseCase,
    UpdateCustomerUseCase,
    ListCustomersUseCase
  ],
})

export class HttpModule { }