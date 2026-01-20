"use client";

import {
  createProductSchema,
  CreateProductSchema,
} from "@/app/_actions/products/_schemas/schemas";
import createProduct from "@/app/_actions/products/create-product";
import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

interface DialogProductContentProps {
  onClose?: () => void;
}

function DialogProductContent({ onClose }: DialogProductContentProps) {
  //hooks
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
    shouldUnregister: true,
  });

  //functions
  async function onSubmit(data: CreateProductSchema) {
    try {
      await createProduct(data); // server action
      onClose?.();
      toast.success("Product created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("There was an error creating the product.");
    }
  }

  return (
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
                  onValueChange={(values) => field.onChange(values.floatValue)}
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
                  onValueChange={(values) => field.onChange(values.floatValue)}
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
  );
}

export default DialogProductContent;
