import { useState } from "react";
import { Inbox, Mail, MailOpen, Reply, Trash2 } from "lucide-react";

import { Button } from "../../components/ui/Button";
import { ConfirmDialog, Modal } from "../../components/ui/Modal";
import { EmptyState, PageHeader } from "../../components/ui/Section";
import { useToast } from "../../components/ui/toastContext";
import { db, useStore } from "../../lib/store";
import { cn, formatDate } from "../../lib/utils";

const FILTERS = [
  { id: "all", label: "Semua" },
  { id: "unread", label: "Belum dibaca" },
];

export function MessagesAdmin() {
  const { messages } = useStore();
  const toast = useToast();

  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const unreadCount = messages.filter((message) => !message.read).length;
  const visible =
    filter === "unread" ? messages.filter((message) => !message.read) : messages;

  // Always read the live copy so read/unread state stays in sync.
  const current = messages.find((message) => message.id === openId) ?? null;

  const openMessage = (message) => {
    setOpenId(message.id);
    if (!message.read) db.setMessageRead(message.id, true);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    db.remove("messages", pendingDelete.id);
    toast("Pesan dihapus.", "info");
    setPendingDelete(null);
    setOpenId(null);
  };

  return (
    <>
      <PageHeader
        title="Pesan"
        description="Inbox dari form kontak di halaman publik."
        actions={
          <div className="flex rounded-lg border border-slate-200 bg-white p-1">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                  filter === item.id
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-500 hover:text-slate-800",
                )}
              >
                {item.label}
                {item.id === "unread" && unreadCount > 0 && ` (${unreadCount})`}
              </button>
            ))}
          </div>
        }
      />

      {visible.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={filter === "unread" ? "Tidak ada pesan baru" : "Inbox masih kosong"}
          description="Pesan yang dikirim lewat form kontak akan muncul di sini."
        />
      ) : (
        <ul className="space-y-3">
          {visible.map((message) => (
            <li key={message.id}>
              <button
                type="button"
                onClick={() => openMessage(message)}
                className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-card transition-all hover:border-brand-200 hover:shadow-soft"
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    message.read ? "bg-slate-100 text-slate-400" : "bg-brand-50 text-brand-600",
                  )}
                >
                  {message.read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-slate-900">
                      {message.name}
                    </span>
                    {!message.read && (
                      <span className="shrink-0 rounded-full bg-brand-600 px-2 py-0.5 font-mono text-[10px] font-medium text-white">
                        Baru
                      </span>
                    )}
                  </span>
                  <span className="block truncate text-sm text-slate-500">
                    {message.message}
                  </span>
                </span>

                <time className="hidden shrink-0 font-mono text-xs text-slate-400 sm:block">
                  {formatDate(message.createdAt)}
                </time>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={Boolean(current)}
        onClose={() => setOpenId(null)}
        title={current ? `Pesan dari ${current.name}` : ""}
        description={current ? formatDate(current.createdAt) : ""}
        footer={
          current && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  db.setMessageRead(current.id, false);
                  toast("Ditandai belum dibaca.", "info");
                  setOpenId(null);
                }}
              >
                Tandai belum dibaca
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPendingDelete(current);
                }}
              >
                <Trash2 className="h-4 w-4" />
                Hapus
              </Button>
              <Button
                as="a"
                href={`mailto:${current?.email}?subject=${encodeURIComponent(
                  "Re: pesan dari website B0MBER Softgen",
                )}`}
                size="sm"
              >
                <Reply className="h-4 w-4" />
                Balas via email
              </Button>
            </>
          )
        }
      >
        {current && (
          <div className="space-y-5 text-sm">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </dt>
                <dd className="mt-1 break-all text-slate-800">{current.email}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Perusahaan
                </dt>
                <dd className="mt-1 text-slate-800">{current.company || "—"}</dd>
              </div>
            </dl>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Pesan
              </dt>
              <dd className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-700">
                {current.message}
              </dd>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Hapus pesan ini?"
        message={pendingDelete ? `Pesan dari ${pendingDelete.name} akan dihapus permanen.` : ""}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default MessagesAdmin;
