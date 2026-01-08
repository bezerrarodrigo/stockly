import { LayoutGrid, Package, ShoppingBasket } from "lucide-react";
import SidebarButton from "./sidebar-button";

export function Sidebar() {
  return (
    <div className="w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-black">STOCKLY</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGrid className="size-5" />
          Dashboard
        </SidebarButton>
        <SidebarButton href="/products">
          <Package className="size-5" />
          Products
        </SidebarButton>
        <SidebarButton href="/sales">
          <ShoppingBasket className="size-5" />
          Sales
        </SidebarButton>
      </div>
    </div>
  );
}
