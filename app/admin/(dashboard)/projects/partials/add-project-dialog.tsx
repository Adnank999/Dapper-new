"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProjectForm } from "./ProjectForm"; 

export function ProjectFormDialog(props: {
  mode: "create" | "update";
  projectId?: string;
  onSuccessRedirectTo?: string;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  const isCreate = props.mode === "create";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          {isCreate ? (
            <Plus className="mr-2 h-4 w-4" />
          ) : (
            <Pencil className="mr-2 h-4 w-4" />
          )}
          {props.triggerLabel ?? (isCreate ? "Add Project" : "Edit Project")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>{isCreate ? "Create Project" : "Update Project"}</DialogTitle>
          <DialogDescription>
            {isCreate
              ? "Fill the details and save to create a new project."
              : "Update the details and save your changes."}
          </DialogDescription>
        </DialogHeader>

        {/* IMPORTANT: close the dialog on success */}
        <ProjectForm
          {...props}
          onSuccess={() => setOpen(false)}
          footerSlot={(submitBtn) => <DialogFooter>{submitBtn}</DialogFooter>}
        />
      </DialogContent>
    </Dialog>
  );
}
