import { z } from "zod";

export const categoryEnum = z.enum(["Design", "Development", "AI", "Mobile"]);

export const projectCreateSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  shortDescription: z.string().min(10, "Short description is too short"),
  longDescription: z.string().min(20, "Long description is too short"),
  imageUrl: z.string().url("Image URL must be a valid URL"),
  category: categoryEnum,
  technologies: z.array(z.string().min(1)).min(1, "Add at least one technology"),
  link: z.string().url("Link must be a valid URL").optional().or(z.literal("")),
});

export const projectUpdateSchema = projectCreateSchema.partial().extend({
  id: z.string().min(1),
});
