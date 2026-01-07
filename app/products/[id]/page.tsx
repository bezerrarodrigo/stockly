async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <h2>Product detail of: {id}</h2>
    </div>
  );
}

export default ProductDetails;
