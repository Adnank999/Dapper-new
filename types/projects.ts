export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  category: string;
  technologies: string[];
  link?: string;
}

export type Category = 'All' | 'Design' | 'Development' | 'AI' | 'Mobile';
