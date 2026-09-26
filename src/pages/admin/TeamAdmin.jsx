import { Users } from "lucide-react";

import { ContentManager } from "../../components/admin/ContentManager";

export function TeamAdmin() {
  return (
    <ContentManager
      collection="team"
      title="Tim"
      description="Anggota tim yang tampil pada marquee di bagian About."
      itemLabel="Anggota tim"
      addLabel="Tambah anggota"
      emptyIcon={Users}
      emptyTitle="Belum ada anggota tim"
      emptyDescription="Tambahkan anggota tim untuk ditampilkan pada situs."
      fields={[
        { name: "name", label: "Nama", type: "text", required: true, placeholder: "Nama lengkap" },
        { name: "role", label: "Jabatan", type: "text", required: true, placeholder: "Frontend Developer" },
        { name: "image", label: "Foto", type: "image" },
      ]}
      primary={(member) => ({
        title: member.name,
        subtitle: member.role,
        image: member.image,
      })}
    />
  );
}

export default TeamAdmin;
