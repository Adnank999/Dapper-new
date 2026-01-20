"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@/src/lib/apollo/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { projectCreateSchema } from "@/schema/project/schema";
import { CREATE_PROJECT, UPDATE_PROJECT, GET_PROJECT } from "@/src/lib/apollo/project/project.gql";

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

type FormValues = z.infer<typeof projectCreateSchema>;

export function ProjectForm({
  mode,
  projectId,
  onSuccessRedirectTo,
}: {
  mode: "create" | "update";
  projectId?: string;
  onSuccessRedirectTo?: string; // e.g. "/admin/projects"
}) {
  // If update mode, fetch the project to prefill
  const shouldFetch = mode === "update" && !!projectId;
  const { data, loading: loadingProject, error: projectError } = useQuery(GET_PROJECT, {
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
      imageUrl: "",
      category: "Development",
      technologies: [],
      link: "",
    },
  });

  // Prefill for edit
  useEffect(() => {
    if (mode !== "update") return;
    const p = data?.project;
    if (!p) return;

    form.reset({
      title: p.title ?? "",
      shortDescription: p.shortDescription ?? "",
      longDescription: p.longDescription ?? "",
      imageUrl: p.imageUrl ?? "",
      category: p.category ?? "Development",
      technologies: Array.isArray(p.technologies) ? p.technologies : [],
      link: p.link ?? "",
    });
  }, [data, form, mode]);

  const technologiesValue = (form.watch("technologies") ?? []).join(", ");

  async function onSubmit(values: FormValues) {
    const input = {
      ...values,
      link: values.link ? values.link : null,
    };

    if (mode === "create") {
      const res = await createProject({ variables: { input } });
      if (!res.data?.createProject?.id) throw new Error("Create failed");
    } else {
      if (!projectId) throw new Error("projectId is required for update");
      const res = await updateProject({
        variables: { input: { id: projectId, ...input } },
      });
      if (!res.data?.updateProject?.id) throw new Error("Update failed");
    }

    if (onSuccessRedirectTo) window.location.href = onSuccessRedirectTo;
  }

  const busy = creating || updating;

  return (
    <div className="space-y-4">
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

      {(mode === "update" && loadingProject) ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <Textarea placeholder="One-liner summary..." {...field} />
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
                    <Textarea rows={8} placeholder="Full details..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technologies as CSV input -> string[] */}
            <FormItem>
              <FormLabel>Technologies (comma separated)</FormLabel>
              <FormControl>
                <Input
                  value={technologiesValue}
                  onChange={(e) => {
                    const arr = e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    form.setValue("technologies", arr, { shouldValidate: true });
                  }}
                  placeholder="Next.js, GraphQL, MongoDB"
                />
              </FormControl>
              <p className="text-sm text-muted-foreground">
                Example: Next.js, GraphQL, MongoDB
              </p>
              <FormMessage />
            </FormItem>

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

            <Button type="submit" disabled={busy}>
              {busy
                ? "Saving..."
                : mode === "create"
                ? "Create Project"
                : "Update Project"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
