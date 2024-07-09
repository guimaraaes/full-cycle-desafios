import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";

export const productRouter = express.Router();

// GET /product - List all products
productRouter.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await usecase.execute({});
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST /product - Create a new product
productRouter.post("/", async (req: Request, res: Response) => {
  const { name, price } = req.body;
    const createProductUseCase = new CreateProductUseCase(new ProductRepository());
  try {
    
    const output = await createProductUseCase.execute({ name, price });
    
    res.status(201).json(output);
  } catch (err) {
    console.log(err)

    res.status(500).send(err);
  }
});