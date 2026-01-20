"use client";

import { Product } from "@/app/generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "../_components/ui/alert-dialog";
import { Badge } from "../_components/ui/badge";
import { Button } from "../_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../_components/ui/dropdown-menu";
import DeleteDialogContent from "./_components/delete-dialog-content";
import { Dialog } from "../_components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import UpsertDialogProductContent from "./_components/dialog-content";
import { useState } from "react";

const ActionCell = ({ product }: { product: Product }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              <ClipboardCopyIcon size={16} />
              Copy ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <EditIcon size={16} />
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <TrashIcon size={16} />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertDialogProductContent
          defaultValues={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}
          onClose={() => setEditDialogOpen(false)}
        />
        <DeleteDialogContent productId={product.id} />
      </Dialog>
    </AlertDialog>
  );
};

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
    cell: ({ row }) => {
      const product = row.original;
      return `$ ${product.price}`;
    },
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => {
      const product = row.row.original;
      return <ActionCell product={product} />;
    },
  },
];
