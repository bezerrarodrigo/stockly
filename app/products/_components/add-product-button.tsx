"use client";

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
import * as z from "zod";

const addProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." }),
  price: z.number().min(0.01, { message: "Price must be at least 0.01." }),
  stock: z.number().int().min(1, { message: "Stock is required." }),
});

type AddProductFormData = z.infer<typeof addProductSchema>;

function AddProductButton() {
  //state
  const [dialogOpen, setDialogOpen] = useState(false);

  //hooks
  const form = useForm<AddProductFormData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
    shouldUnregister: true,
  });

  //functions

  async function onSubmit(data: AddProductFormData) {
    try {
      await createProduct(data); // server action
      setDialogOpen(false);
    } catch (error) {
      console.log(error);
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
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create product</DialogTitle>
            <DialogDescription>
              Please, fill in the information below.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-4 gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Product Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter product name here"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                  <NumericFormat
                    customInput={Input}
                    {...field}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}
                    prefix="$ "
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    onChange={() => {}}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="stock"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                  <NumericFormat
                    {...field}
                    customInput={Input}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    onChange={() => {}}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2Icon className="size-5 animate-spin" />
              )}
              Add product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductButton;
