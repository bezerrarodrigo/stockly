import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";

export default async function Products() {
  const products = await db.product.findMany();

  return (
    <div className="w-full space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-sm font-semibold text-slate-500">
            Product Manager
          </span>
          <h2 className="text-xl font-semibold">Products</h2>
        </div>
        <Button>
          <PlusIcon className="size-5" />
          New product
        </Button>
      </div>
    </div>
  );
}
