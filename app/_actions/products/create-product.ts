"use server";

import { db } from "@/app/_lib/prisma";
import { revalidate } from "@/app/products/page";
import { revalidatePath } from "next/cache";

async function createProduct({
  name,
  price,
  stock,
}: {
  name: string;
  price: number;
  stock: number;
}) {
  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  });
  revalidatePath("/products");
}

export default createProduct;
