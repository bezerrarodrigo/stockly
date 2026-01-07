import { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2>Product Layout</h2>
      {children}
    </div>
  );
}
