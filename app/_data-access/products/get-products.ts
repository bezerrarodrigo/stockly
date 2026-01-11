import { db } from "@/app/_lib/prisma";
import { Product } from "@/app/generated/prisma/client";

export async function getProducts(): Promise<Product[]> {
  const products = await db.product.findMany();
  const plainProducts = JSON.parse(JSON.stringify(products));
  return plainProducts;
}
