import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product A",
      price: 100,
    };

    const output = {
      id: expect.any(String),
      name: "Product A",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);

    const productFromDb = await productRepository.find(result.id);
    expect(productFromDb.id).toBe(result.id);
    expect(productFromDb.name).toBe(result.name);
    expect(productFromDb.price).toBe(result.price);
  });
});