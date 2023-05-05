import { CustomersRepository } from "@application/repositories/customers-repository";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "@src/app.module";
import { InMemoryCustomersRepository } from "./repositories/in-memory-customers-repository";

export let app: INestApplication;

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = module.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});