"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../_lib/prisma";

async function deleteProduct(id: string) {
  await db.product.delete({
    where: { id },
  });
  revalidatePath("/products");
}

export default deleteProduct;
