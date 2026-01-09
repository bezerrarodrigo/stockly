import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Products() {
  const products = await db.product.findMany();
  const plainProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className="m-6 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-sm font-semibold text-slate-500">Products</span>
          <h2 className="text-xl font-semibold">Products Manager</h2>
        </div>
        <Button>
          <PlusIcon className="size-5" />
          New product
        </Button>
      </div>
      <DataTable columns={columns} data={plainProducts} />
    </div>
  );
}
