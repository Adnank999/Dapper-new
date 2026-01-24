"use client";

import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQuery } from "@apollo/client/react";

import { projectCreateSchema } from "@/schema/project/schema";
import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  GET_PROJECT,
} from "@/src/lib/apollo/project/project.gql";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import ImageUploaderUppy from "./ImageUploaderUppy";

type FormValues = z.infer<typeof projectCreateSchema>;

const CATEGORIES = ["Design", "Development", "AI", "Mobile"] as const;

export function ProjectForm({
  mode,
  projectId,
  onSuccessRedirectTo,
  onSuccess,
  footerSlot,
}: {
  mode: "create" | "update";
  projectId?: string;
  onSuccessRedirectTo?: string; // e.g. "/admin/projects"

  // Optional for dialog usage
  onSuccess?: () => void;
  footerSlot?: (submitButton: React.ReactNode) => React.ReactNode;
}) {
  const isUpdate = mode === "update";

  // If update mode, fetch the project to prefill
  const shouldFetch = isUpdate && !!projectId;
  const {
    data,
    loading: loadingProject,
    error: projectError,
  } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
    skip: !shouldFetch,
    fetchPolicy: "network-only",
  });

  const [createProject, { loading: creating, error: createError }] =
    useMutation(CREATE_PROJECT);

  const [updateProject, { loading: updating, error: updateError }] =
    useMutation(UPDATE_PROJECT);

  const form = useForm<FormValues>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      longDescription: "",
      imageUrl: [], // ✅ multiple images
      category: "Development",
      technologies: [],
      link: "",
    },
  });

  // Keep uploaded assets for thumbnail preview on the right
  const [uploadedAssets, setUploadedAssets] = useState<
    { original: string }[]
  >([]);

  // Prefill for edit
  useEffect(() => {
    if (!isUpdate) return;
    const p = data?.project;
    if (!p) return;

    form.reset({
      title: p.title ?? "",
      shortDescription: p.shortDescription ?? "",
      longDescription: p.longDescription ?? "",
      imageUrl: Array.isArray(p.imageUrl) ? p.imageUrl : [],
      category: p.category ?? "Development",
      technologies: Array.isArray(p.technologies) ? p.technologies : [],
      link: p.link ?? "",
    });

    // Optional: show existing images as previews (no thumbnails available).
    // We'll just show original URLs as preview if you want:
    const existingImages: string[] = Array.isArray(p.imageUrl) ? p.imageUrl : [];
    setUploadedAssets(
      existingImages.map((url) => ({ original: url, thumbnail: url })),
    );
  }, [data, form, isUpdate]);


  const imagesValue = useMemo(() => form.watch("imageUrl") ?? [], [form]);

  async function onSubmit(values: FormValues) {
    const input = {
      ...values,
      link: values.link ? values.link : null,
    };

    if (mode === "create") {
      const res = await createProject({ variables: { input } });
      if (!res.data?.createProject?.id) throw new Error("Create failed");

      // Reset after create (optional)
      form.reset({
        title: "",
        shortDescription: "",
        longDescription: "",
        imageUrl: [],
        category: "Development",
        technologies: [],
        link: "",
      });
      setUploadedAssets([]);
    } else {
      if (!projectId) throw new Error("projectId is required for update");
      const res = await updateProject({
        variables: { input: { id: projectId, ...input } },
      });
      if (!res.data?.updateProject?.id) throw new Error("Update failed");
    }

    onSuccess?.();

    if (onSuccessRedirectTo) {
      window.location.href = onSuccessRedirectTo;
    }
  }

  const busy = creating || updating;

  const submitButton = (
    <Button type="submit" disabled={busy} className="cursor-pointer">
      {busy
        ? "Saving..."
        : mode === "create"
          ? "Create Project"
          : "Update Project"}
    </Button>
  );

  const isLoading = isUpdate && loadingProject;

  return (
    <div className="space-y-4">
      {/* Errors */}
      {projectError && (
        <p className="text-sm text-destructive">
          Failed to load project: {projectError.message}
        </p>
      )}
      {createError && (
        <p className="text-sm text-destructive">{createError.message}</p>
      )}
      {updateError && (
        <p className="text-sm text-destructive">{updateError.message}</p>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6 lg:grid-cols-2">
              {/* LEFT: fields */}
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="One-liner summary..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Long description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={8}
                          placeholder="Full details..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="cursor-pointer w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Technologies as CSV input -> string[] */}
                <FormField
                  control={form.control}
                  name="technologies"
                  render={({ field }) => {
                    const csv = (field.value ?? []).join(", ");
                    return (
                      <FormItem>
                        <FormLabel>Technologies (comma separated)</FormLabel>
                        <FormControl>
                          <Input
                            value={csv}
                            onChange={(e) => {
                              const arr = e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean);

                              field.onChange(arr); // ✅ THIS makes it work reliably
                            }}
                            placeholder="Next.js, GraphQL, MongoDB"
                          />
                        </FormControl>
                        <p className="text-sm text-muted-foreground">
                          Example: Next.js, GraphQL, MongoDB
                        </p>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />



                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project link (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                {footerSlot ? footerSlot(submitButton) : submitButton}
              </div>

              {/* RIGHT: uploader */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Images</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ImageUploaderUppy
                      folderName="projects"
                      maxNumberOfFiles={10}
                      onUploaded={(assets) => {
                        setUploadedAssets(assets);

                        // ✅ Replace images with uploaded originals
                        // If you want "append", tell me and I’ll adjust.
                        form.setValue(
                          "imageUrl",
                          assets.map((a) => a.original),
                          { shouldValidate: true, shouldDirty: true },
                        );
                      }}
                    />

                    {/* Thumbnails preview */}
                    {uploadedAssets.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {uploadedAssets.map((a, idx) => (
                          <Image
                            key={`${a.original}-${idx}`}
                            src={a.original}
                            alt={`Uploaded ${idx + 1}`}
                            className="h-24 w-full rounded-md object-cover"
                            width={200}
                            height={100}
                          />
                        ))}
                      </div>
                    )}

                    {/* Show current images count */}
                    <p className="text-sm text-muted-foreground">
                      Selected images: {imagesValue.length}
                    </p>

                    {/* Validation error for images */}
                    {form.formState.errors.imageUrl?.message && (
                      <p className="text-sm text-destructive">
                        {String(form.formState.errors.imageUrl.message)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
