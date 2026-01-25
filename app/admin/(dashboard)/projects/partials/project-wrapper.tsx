"use client";

import React from "react";

import { ProjectFormDialog } from "./add-project-dialog";
import { ProjectCard } from "./project-cards";

import { Project } from "@/types/projects";
import { useQuery } from "@apollo/client/react";
import { GET_PROJECTS } from "@/src/lib/apollo/project/project.gql";
import { DataTable } from "../../components/data-table";
import { getProjectColumns } from "./project-columns";

export default function ProjectWrapper() {
  const { data, loading, error, refetch } = useQuery<{ projects: Project[] }>(
    GET_PROJECTS,{fetchPolicy: "cache-first"}
  );

  const projects = data?.projects ?? [];

  if (loading) return <div>Loading projects...</div>;
  if (error)
    return <div className="text-red-500">Failed to load projects.</div>;

  return (
    <div className="space-y-6">
      {/* Your card view (now receives projects) */}
      <div className="@container/main px-4 lg:px-6">
        <ProjectCard projects={projects} />
      </div>

      {/* Table view */}
      <div className="@container/main px-4 lg:px-6 mt-8 lg:mt-12">
        <DataTable<Project>
          data={projects}
          columns={getProjectColumns({
            onDeleted: () => refetch(),
            onEdited: () => refetch(),
          })}
          searchPlaceholder="Search projects..."
          filters={[
            {
              id: "category",
              label: "Category",
              options: Array.from(
                new Set(
                  projects.map((p) => (p.category || "Uncategorized").trim()),
                ),
              ).map((c) => ({ label: c, value: c })),
            },
          ]}
          toolbarRight={
            <ProjectFormDialog
              mode="create"
              onSuccessRedirectTo="/admin/projects"
            />
          }
        />
      </div>
    </div>
  );
}
