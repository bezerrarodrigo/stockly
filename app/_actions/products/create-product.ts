"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateProductSchema } from "./_schemas/schemas";

async function createProduct(data: CreateProductSchema) {
  await db.product.create({ data });
  revalidatePath("/products");
}

export default createProduct;
