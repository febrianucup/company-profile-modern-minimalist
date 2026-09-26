import { ListChecks } from "lucide-react";

import { ContentManager } from "../../components/admin/ContentManager";

export function ServicesAdmin() {
  return (
    <ContentManager
      collection="services"
      title="Layanan"
      description="Langkah-langkah proses kerja yang tampil sebagai timeline di situs."
      itemLabel="Layanan"
      addLabel="Tambah layanan"
      emptyIcon={ListChecks}
      emptyTitle="Belum ada layanan"
      emptyDescription="Tambahkan langkah layanan untuk ditampilkan pada timeline."
      fields={[
        {
          name: "title",
          label: "Judul",
          type: "text",
          required: true,
          placeholder: "Konsultasi Pengembangan Web",
        },
        {
          name: "description",
          label: "Deskripsi",
          type: "textarea",
          required: true,
          placeholder: "Penjelasan singkat langkah ini...",
        },
      ]}
      primary={(service) => ({
        title: service.title,
        subtitle: service.description,
      })}
    />
  );
}

export default ServicesAdmin;
