import { createYoga, createSchema } from "graphql-yoga";
import { connectMongo } from "@/src/lib/mongodb";
import { ProjectsRepo } from "@/repo/project.repo";
import { projectCreateSchema, projectUpdateSchema } from "@/schema/project/schema";

const typeDefs = /* GraphQL */ `
  enum Category { Design Development AI Mobile }

  type Project {
    id: ID!
    title: String!
    shortDescription: String!
    longDescription: String!
    imageUrl: [String!]! 
    category: Category!
    technologies: [String!]!
    link: String
  }

  input ProjectCreateInput {
    title: String!
    shortDescription: String!
    longDescription: String!
    imageUrl: [String!]!
    category: Category!
    technologies: [String!]!
    link: String
  }

  input ProjectUpdateInput {
    id: ID!
    title: String
    shortDescription: String
    longDescription: String
    imageUrl: [String!]!
    category: Category
    technologies: [String!]
    link: String
  }

  type Query {
    project(id: ID!): Project
    projects: [Project!]!
  }

  type Mutation {
    createProject(input: ProjectCreateInput!): Project!
    updateProject(input: ProjectUpdateInput!): Project!
  }
`;

const resolvers = {
  Query: {
    project: async (_: unknown, args: { id: string }) => {
      const { db } = await connectMongo();
      return ProjectsRepo.get(db, args.id);
    },
    projects: async () => {
      const { db } = await connectMongo();
      return ProjectsRepo.list(db);
    },
  },
  Mutation: {
    createProject: async (_: unknown, args: { input: unknown }) => {
      const parsed = projectCreateSchema.parse(args.input);
      const { db } = await connectMongo();
      return ProjectsRepo.create(db, { ...parsed, link: parsed.link || undefined });
    },
    updateProject: async (_: unknown, args: { input: unknown }) => {
      const parsed = projectUpdateSchema.parse(args.input);
      const { db } = await connectMongo();
      const updated = await ProjectsRepo.update(
        db,
        parsed.id,
        { ...parsed, link: parsed.link || undefined } as any
      );
      if (!updated) throw new Error("Project not found");
      return updated;
    },
  },
};

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
  cors: {
    origin: ["https://studio.apollographql.com"],
    credentials: true,
    allowedHeaders: ["content-type", "authorization"],
    methods: ["GET", "POST", "OPTIONS"],
  },
});

// ✅ Export OPTIONS so preflight includes Access-Control-Allow-Methods
export { yoga as GET, yoga as POST, yoga as OPTIONS };
