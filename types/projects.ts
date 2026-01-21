export type Category = "All" | "Design" | "Development" | "AI" | "Mobile";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string[];
  category: Exclude<Category, "All">; // category on a project should not be "All"
  technologies: string[];
  link?: string;
}
