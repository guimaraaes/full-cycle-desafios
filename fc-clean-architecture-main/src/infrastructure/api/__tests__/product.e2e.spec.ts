import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    // Create a product
    const createResponse = await request(app)
      .post("/product")
      .send({
        name: "New Product",
        price: 150,
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.name).toBe("New Product");
    expect(createResponse.body.price).toBe(150);
  });

  it("should list all products", async () => {
    // Create some products to list
    await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 100,
      });
    await request(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 200,
      });

    // List products
    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("Product 1");
    expect(product1.price).toBe(100);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(200);

  });

  it("should return an empty list if there are no products", async () => {
    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(0);
  });
});
