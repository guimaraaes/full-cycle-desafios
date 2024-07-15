import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

const input: InputCreateProductDto = {
  name: "Product A",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};



describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const invalidInput = { ...input, name: "" };

    await expect(createProductUseCase.execute(invalidInput)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price is missing", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const invalidInput = { ...input, price: -1 };

    await expect(createProductUseCase.execute(invalidInput)).rejects.toThrow(
      "price must be greater than 0"
    );
  });

});