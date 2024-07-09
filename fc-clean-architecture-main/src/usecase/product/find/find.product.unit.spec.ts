import FindProductUseCase from "./find.product.usecase";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import Product from "../../../domain/product/entity/product";
const product = new Product("123", "Product A", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};
describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const product = new Product("123", "Product A", 100);
    const productRepository = MockRepository();
    productRepository.find.mockReturnValue(Promise.resolve(product));
    
    const input: InputFindProductDto = { id: "123" };
    const findProductUseCase = new FindProductUseCase(productRepository);
    
    const output = await findProductUseCase.execute(input);
    
    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should throw an error when product is not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockReturnValue(Promise.resolve(null));
    
    const input: InputFindProductDto = { id: "123" };
    const findProductUseCase = new FindProductUseCase(productRepository);
    
    await expect(findProductUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
  });
});