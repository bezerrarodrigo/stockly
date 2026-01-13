import { db } from "@/app/_lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const product = await db.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json(product, { status: 200 });
  } catch (error) {
    console.error("Prisma Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const deletedProduct = await db.product.delete({
      where: { id: id },
    });

    return Response.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.error("Prisma Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
