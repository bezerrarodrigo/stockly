import z from "zod";

export const createProductSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." }),
  price: z.number().min(0.01, { message: "Price must be at least 0.01." }),
  stock: z.number().int().min(1, { message: "Stock is required." }),
});

export type UpsertProductSchema = z.infer<typeof createProductSchema>;
