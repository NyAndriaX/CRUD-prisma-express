import prisma from "@lib/prisma";
import { ProductTypes } from "@/types/product.type";

export const createProduct = async ({
  name,
  price,
  image,
  description,
}: ProductTypes) => {
  const productData = await prisma.products.create({
    data: {
      name,
      price,
      image,
      description,
    },
  });

  return productData;
};

export const readProducts = async () => {
  const listProducts = await prisma.products.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      description: true
    }
  });

  return listProducts;
};

export const readProductByID = async (id: number) => {
  const product = await prisma.products.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      description: true,
    }
  });

  return product;
};

export const updateProduct = async (
  id: number,
  { name, price, image, description }: Partial<ProductTypes>
) => {
  const productTarget = await prisma.products.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      price,
      image,
      description,
    },
  });

  return productTarget;
};

export const deleteProduct = async (id: number) => {
  const productToDelete = await prisma.products.delete({
    where: {
      id: Number(id),
    },
  });

  return productToDelete;
};
