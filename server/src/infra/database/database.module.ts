import { Module } from "@nestjs/common";
import { FirebaseService } from "./firebase/firebase.service";
import { CustomersRepository } from "@application/repositories/customers-repository";
import { FirebaseCustomersRepository } from "./firebase/repositories/firebase-customers-repository";


@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    FirebaseService,
    {
      provide: CustomersRepository,
      useClass: FirebaseCustomersRepository,
    }
  ],
  exports: [
    CustomersRepository,
  ]
})

export class DatabaseModule { }