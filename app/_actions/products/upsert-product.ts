"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { UpsertProductSchema } from "./_schemas/schemas";

async function upsertProduct(data: UpsertProductSchema) {
  await db.product.upsert({
    where: { id: data?.id ?? "" },
    update: data,
    create: data,
  });
  revalidatePath("/products");
}

export default upsertProduct;
