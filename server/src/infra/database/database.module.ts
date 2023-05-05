import { Module } from "@nestjs/common";
import { FirebaseService } from "./firebase/firebase.service";
import { CustomersRepository } from "@application/repositories/customers-repository";
import { FirebaseCustomersRepository } from "./firebase/repositories/firebase-customers-repository";
import { InMemoryCustomersRepository } from "@test/repositories/in-memory-customers-repository";

@Module({
  imports: [],
  providers: [
    FirebaseService,
    {
      provide: CustomersRepository,
      useClass: process.env.NODE_ENV === 'test' ? InMemoryCustomersRepository : FirebaseCustomersRepository,
    }
  ],
  exports: [
    CustomersRepository,
  ]
})

export class DatabaseModule { }