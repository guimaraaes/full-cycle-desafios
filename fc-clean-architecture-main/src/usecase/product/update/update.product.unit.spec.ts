import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

const product = ProductFactory.create("a", "Product A", 100);

const input: InputUpdateProductDto = {
  id: product.id,
  name: "Product A Updated",
  price: 150,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output: OutputUpdateProductDto = await productUpdateUseCase.execute(input);

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      price: input.price,
    });
  });
});
