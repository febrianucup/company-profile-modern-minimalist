import { FolderKanban } from "lucide-react";

import { ContentManager } from "../../components/admin/ContentManager";

export function ProjectsAdmin() {
  return (
    <ContentManager
      collection="projects"
      title="Proyek"
      description="Kartu proyek yang tampil di bagian Services pada situs."
      itemLabel="Proyek"
      addLabel="Tambah proyek"
      emptyIcon={FolderKanban}
      emptyTitle="Belum ada proyek"
      emptyDescription="Tambahkan proyek pertama untuk ditampilkan pada situs."
      fields={[
        { name: "title", label: "Judul", type: "text", required: true, placeholder: "E-Commerce Dashboard" },
        {
          name: "description",
          label: "Deskripsi",
          type: "textarea",
          required: true,
          placeholder: "Penjelasan singkat proyek...",
        },
        { name: "image", label: "Gambar", type: "image" },
        {
          name: "link",
          label: "Link",
          type: "text",
          hint: "Boleh link internal (#Contact) atau URL lengkap.",
          placeholder: "#Contact",
        },
      ]}
      primary={(project) => ({
        title: project.title,
        subtitle: project.description,
        image: project.image,
      })}
    />
  );
}

export default ProjectsAdmin;
