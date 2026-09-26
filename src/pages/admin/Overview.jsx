import { Link } from "react-router-dom";
import {
  ArrowRight,
  FolderKanban,
  Inbox,
  ListChecks,
  Plus,
  Users,
} from "lucide-react";

import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/Section";
import { useStore } from "../../lib/store";

function formatDate(iso) {
  return new Date(iso).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function Overview() {
  const { projects, services, team, messages } = useStore();
  const unread = messages.filter((message) => !message.read).length;
  const recent = [...messages].slice(0, 4);

  const stats = [
    { label: "Proyek", value: projects.length, icon: FolderKanban, to: "/admin/projects" },
    { label: "Layanan", value: services.length, icon: ListChecks, to: "/admin/services" },
    { label: "Anggota tim", value: team.length, icon: Users, to: "/admin/team" },
    { label: "Pesan belum dibaca", value: unread, icon: Inbox, to: "/admin/messages" },
  ];

  return (
    <>
      <PageHeader
        title="Ringkasan"
        description="Kondisi konten situs dan pesan masuk."
        actions={
          <Button as={Link} to="/admin/projects">
            <Plus className="h-4 w-4" />
            Tambah proyek
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <stat.icon className="h-4 w-4" />
              </span>
              <span className="font-heading text-3xl font-semibold tracking-tight text-slate-900">
                {stat.value}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">{stat.label}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold tracking-tight text-slate-900">
            Pesan terbaru
          </h2>
          <Link
            to="/admin/messages"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            Lihat semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-sm text-slate-500">
              Belum ada pesan. Pesan dari form kontak akan muncul di sini.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
            {recent.map((message) => (
              <li key={message.id} className="flex items-center gap-4 px-5 py-4">
                <span
                  className={
                    message.read
                      ? "h-2 w-2 shrink-0 rounded-full bg-slate-200"
                      : "h-2 w-2 shrink-0 rounded-full bg-brand-500"
                  }
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {message.name}
                    <span className="ml-2 font-normal text-slate-400">{message.email}</span>
                  </p>
                  <p className="truncate text-sm text-slate-500">{message.message}</p>
                </div>
                <time className="hidden shrink-0 font-mono text-xs text-slate-400 sm:block">
                  {formatDate(message.createdAt)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default Overview;
