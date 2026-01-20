"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertDialogProductContent from "./dialog-content";

function CreateProductButton() {
  //state
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-5" />
          New product
        </Button>
      </DialogTrigger>
      <UpsertDialogProductContent onClose={() => setDialogOpen(false)} />
    </Dialog>
  );
}

export default CreateProductButton;
