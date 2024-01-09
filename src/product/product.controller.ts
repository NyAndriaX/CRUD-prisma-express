import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  readProductByID,
  readProducts,
  updateProduct,
} from "@product/product.model";
import { ProductResponse, ProductTypes } from "@/types/product.type";

export const postProduct = async (
  req: Request,
  res: Response<ProductResponse>
) => {
  const { name, price, image, description }: ProductTypes = req.body;
  try {
    await createProduct({ name, price, image, description });

    return res.status(200).json({
      status: true,
      code: res.statusCode,
      message: "Successfully created product",
    });
  } catch (error) {
    if (!name && !price && !image && !description) {
      res.status(404).json({
        status: false,
        code: res.statusCode,
        message: "Failed to create product",
      });
      return;
    }
  }
};

export const getProducts = async (
  req: Request,
  res: Response<ProductResponse>
) => {
  return res.status(200).json({
    status: true,
    code: res.statusCode,
    message: "success",
    data: await readProducts(),
  });
};

export const getProductByID = async (
  req: Request,
  res: Response<ProductResponse>
) => {
  const { id } = req.params;
  const product = await readProductByID(Number(id));

  if (!product) {
    res.status(404).json({
      status: false,
      code: res.statusCode,
      message: "Product not found",
      data: null,
    });
    return;
  }

  return res.status(200).json({
    status: true,
    code: res.statusCode,
    message: "Success",
    data: product,
  });
};

export const patchProduct = async (
  req: Request,
  res: Response<ProductResponse>
) => {
  const { id } = req.params;
  const { name, price, image, description }: Partial<ProductTypes> = req.body;
  try {
    await updateProduct(Number(id), {
      name,
      price,
      image,
      description,
    });

    return res.status(200).json({
      status: true,
      code: res.statusCode,
      message: "Successfully updated product data",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      code: res.statusCode,
      message: "Failed to update product data",
    });
  }
};

export const destroyProduct = async (
  req: Request,
  res: Response<ProductResponse>
) => {
  const { id } = req.params;
  try {
    await deleteProduct(Number(id));

    return res.status(200).json({
      status: true,
      code: res.statusCode,
      message: "Successfully deleted product",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      code: res.statusCode,
      message: "Failed to delete product",
    });
  }
};
