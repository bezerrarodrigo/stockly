"use server";

import { db } from "@/app/_lib/prisma";
import { CreateProductSchema } from "@/app/products/_components/create-product-button";
import { revalidatePath } from "next/cache";

async function createProduct(data: CreateProductSchema) {
  await db.product.create({ data });
  revalidatePath("/products");
}

export default createProduct;
