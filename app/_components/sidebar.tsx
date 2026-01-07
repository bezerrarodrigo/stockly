import { LayoutGrid, Package, ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";

export function Sidebar() {
  return (
    <div className="w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-black">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <Button variant="ghost" className="justify-start gap-2">
          <LayoutGrid className="size-5" />
          Dashboard
        </Button>
        <Button variant="ghost" className="justify-start gap-2">
          <Package className="size-5" />
          Products
        </Button>
        <Button variant="ghost" className="justify-start gap-2">
          <ShoppingBasket className="size-5" />
          Sales
        </Button>
      </div>
    </div>
  );
}
