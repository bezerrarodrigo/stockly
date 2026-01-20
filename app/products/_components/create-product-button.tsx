"use client";

import {
  createProductSchema,
  CreateProductSchema,
} from "@/app/_actions/products/_schemas/schemas";
import createProduct from "@/app/_actions/products/create-product";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import * as z from "zod";
import DialogProductContent from "./dialog-content";

function CreateProductButton() {
  //state
  const [dialogOpen, setDialogOpen] = useState(false);

  //functions
  async function onSubmit(data: CreateProductSchema) {
    try {
      await createProduct(data); // server action
      setDialogOpen(false);
      toast.success("Product created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("There was an error creating the product.");
    }
  }

  // <-- Component Render --> //

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-5" />
          New product
        </Button>
      </DialogTrigger>
      <DialogProductContent onSubmit={onSubmit} />
    </Dialog>
  );
}

export default CreateProductButton;
