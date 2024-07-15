import Product from "../entity/product";
import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a proct type a", () => {
    const product = ProductFactory.create("a", "Product A", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a proct type b", () => {
    const product = ProductFactory.create("b", "Product B", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when product type is not supported", () => {
    expect(() => ProductFactory.create("c", "Product C", 1)).toThrowError(
      "Product type not supported"
    );
  });

  it("should throw an error when product type is not supported", () => {
    expect(() => ProductFactory.create("c", "Product C", 1)).toThrowError(
      "Product type not supported"
    );
  });

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "name", 100);
    }).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is zero or negative", () => {
    expect(() => {
      const product = new Product("1", "name", -10);
    }).toThrowError("product: price must be greater than 0");
  });

  it("should throw error when name is empty and price is zero or negative", () => {
    expect(() => {
      const product = new Product("1", "", -10);
    }).toThrowError("product: Name is required,product: price must be greater than 0");
  });

});
