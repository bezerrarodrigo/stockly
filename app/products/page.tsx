import { getProducts } from "../_data-access/products/get-products";
import CreateProductButton from "./_components/create-button";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const revalidate = 10;

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="m-6 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-sm font-semibold text-slate-500">Products</span>
          <h2 className="text-xl font-semibold">Products Manager</h2>
        </div>
        <CreateProductButton />
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
