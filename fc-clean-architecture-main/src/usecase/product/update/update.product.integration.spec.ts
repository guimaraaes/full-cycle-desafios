import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product A", 100);
    await productRepository.create(product);

    const input = {
      id: "123",
      name: "Product A Updated",
      price: 150,
    };

    const output = {
      id: "123",
      name: "Product A Updated",
      price: 150,
    };

    const result = await updateProductUseCase.execute(input);

    expect(result).toEqual(output);
  });
});
