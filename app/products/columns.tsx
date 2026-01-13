"use client";

import { Product } from "@/app/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import { Badge } from "../_components/ui/badge";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "In Stock";
  }
  return "Out of Stock";
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      // @ts-expect-error script-eslint/no-unsafe-assignment
      const label = getStatusLabel(product.status);
      return (
        <Badge variant={label === "In Stock" ? "default" : "outline"}>
          <CircleIcon
            className={`${label === "In Stock" ? "fill-primary-foreground" : "fill-destructive-foreground"}`}
          />
          {label}
        </Badge>
      );
    },
  },
];
