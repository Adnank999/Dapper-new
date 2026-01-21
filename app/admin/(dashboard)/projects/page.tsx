import { ProjectFormDialog } from "./partials/add-project-dialog";


export default function AddProject() {
  return (
    <ProjectFormDialog mode="create" onSuccessRedirectTo="/admin/projects" />
  );
}
