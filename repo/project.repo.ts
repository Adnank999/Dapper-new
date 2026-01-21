import "server-only";
import type { Collection, Db } from "mongodb";
import { ObjectId } from "mongodb";
import { Project } from "@/types/projects";


type ProjectDoc = Omit<Project, "id"> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

function toProject(doc: ProjectDoc): Project {
  return {
    id: doc._id.toString(),
    title: doc.title,
    shortDescription: doc.shortDescription,
    longDescription: doc.longDescription,
    imageUrl: doc.imageUrl,
    category: doc.category,
    technologies: doc.technologies,
    link: doc.link,
  };
}

export function projectsCollection(db: Db): Collection<ProjectDoc> {
  return db.collection<ProjectDoc>("projects");
}

export const ProjectsRepo = {
  async create(db: Db, input: Omit<Project, "id">) {
    const col = projectsCollection(db);
    const now = new Date();

    const doc: Omit<ProjectDoc, "_id"> = {
      ...input,
      link: input.link || undefined,
      createdAt: now,
      updatedAt: now,
    };

    const res = await col.insertOne(doc as any);
    const created = await col.findOne({ _id: res.insertedId });
    if (!created) throw new Error("Failed to create project");
    return toProject(created);
  },

  async get(db: Db, id: string) {
    if (!ObjectId.isValid(id)) return null;
    const col = projectsCollection(db);
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toProject(doc) : null;
  },

  async list(db: Db) {
    const col = projectsCollection(db);
    const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
    return docs.map(toProject);
  },

  async update(db: Db, id: string, patch: Partial<Omit<Project, "id">>) {
    if (!ObjectId.isValid(id)) return null;
    const col = projectsCollection(db);
    const now = new Date();

    // don't store empty string as link
    const normalizedPatch: any = {
      ...patch,
      updatedAt: now,
    };
    if (patch.link === "") normalizedPatch.link = undefined;

    const res = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: normalizedPatch },
      { returnDocument: "after" }
    );

    return res.value ? toProject(res.value) : null;
  },
};
