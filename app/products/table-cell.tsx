import { useState } from "react";
import { Product } from "../generated/prisma/client";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "../_components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "../_components/ui/dialog";
import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "../_components/ui/button";
import DeleteDialogContent from "./_components/delete-dialog-content";
import UpsertDialogProductContent from "./_components/dialog-content";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../_components/ui/dropdown-menu";

export const ActionCell = ({ product }: { product: Product }) => {
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
