import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ImageIcon,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { cn } from "../../lib/utils";
import { IMAGE_PRESETS, db, useStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { Field, Input, Textarea } from "../ui/Field";
import { ConfirmDialog, Modal } from "../ui/Modal";
import { EmptyState, PageHeader } from "../ui/Section";
import { useToast } from "../ui/toastContext";

function emptyForm(fields) {
  return fields.reduce((form, field) => ({ ...form, [field.name]: "" }), {});
}

function itemToForm(item, fields) {
  return fields.reduce(
    (form, field) => ({ ...form, [field.name]: item[field.name] ?? "" }),
    {},
  );
}

function ImageField({ value, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-5 w-5 text-slate-300" />
          )}
        </div>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://... atau pilih preset di bawah"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {IMAGE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onChange(preset.value)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
              value === preset.value
                ? "border-brand-400 bg-brand-50 text-brand-700"
                : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50",
            )}
          >
            <img src={preset.value} alt="" className="h-6 w-6 rounded object-cover" />
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Generic list + form manager for a store collection.
 *
 * fields: [{ name, label, type: 'text'|'textarea'|'image', required, hint, placeholder }]
 * primary: (item) => ({ title, subtitle, image })
 */
export function ContentManager({
  collection,
  title,
  description,
  itemLabel,
  addLabel,
  fields,
  primary,
  emptyIcon,
  emptyTitle,
  emptyDescription,
}) {
  const state = useStore();
  const items = state[collection];
  const toast = useToast();

  const [editing, setEditing] = useState(null); // null | {} (new) | item (edit)
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [pendingDelete, setPendingDelete] = useState(null);

  const openNew = () => {
    setForm(emptyForm(fields));
    setErrors({});
    setEditing({});
  };

  const openEdit = (item) => {
    setForm(itemToForm(item, fields));
    setErrors({});
    setEditing(item);
  };

  const closeModal = () => setEditing(null);

  const setValue = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    for (const field of fields) {
      if (field.required && !String(form[field.name] ?? "").trim()) {
        nextErrors[field.name] = `${field.label} wajib diisi.`;
      }
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = fields.reduce(
      (data, field) => ({ ...data, [field.name]: String(form[field.name] ?? "").trim() }),
      {},
    );

    if (editing?.id) {
      db.update(collection, editing.id, payload);
      toast(`${itemLabel} berhasil diperbarui.`);
    } else {
      db.add(collection, payload);
      toast(`${itemLabel} berhasil ditambahkan.`);
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    db.remove(collection, pendingDelete.id);
    toast(`${itemLabel} dihapus.`, "info");
    setPendingDelete(null);
  };

  const iconButton =
    "rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actions={
          <Button onClick={openNew}>
            <Plus className="h-4 w-4" />
            {addLabel}
          </Button>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={emptyIcon}
          title={emptyTitle}
          description={emptyDescription}
          action={
            <Button onClick={openNew} variant="outline">
              <Plus className="h-4 w-4" />
              {addLabel}
            </Button>
          }
        />
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => {
            const row = primary(item);
            return (
              <li
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card"
              >
                {row.image !== undefined && (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    {row.image ? (
                      <img src={row.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-slate-300" />
                    )}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{row.title}</p>
                  {row.subtitle && (
                    <p className="truncate text-sm text-slate-500">{row.subtitle}</p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    className={iconButton}
                    aria-label="Naikkan urutan"
                    disabled={index === 0}
                    onClick={() => db.move(collection, item.id, "up")}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className={iconButton}
                    aria-label="Turunkan urutan"
                    disabled={index === items.length - 1}
                    onClick={() => db.move(collection, item.id, "down")}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className={iconButton}
                    aria-label="Edit"
                    onClick={() => openEdit(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className={cn(iconButton, "hover:text-red-600")}
                    aria-label="Hapus"
                    onClick={() => setPendingDelete(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Modal
        open={editing !== null}
        onClose={closeModal}
        title={editing?.id ? `Edit ${itemLabel}` : `Tambah ${itemLabel}`}
        description={editing?.id ? "Perbarui data lalu simpan." : `Isi data ${itemLabel} baru.`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={closeModal}>
              Batal
            </Button>
            <Button type="submit" size="sm" form="content-form">
              Simpan
            </Button>
          </>
        }
      >
        <form id="content-form" onSubmit={handleSubmit} noValidate className="space-y-5">
          {fields.map((field) => (
            <Field
              key={field.name}
              label={field.label}
              htmlFor={`field-${field.name}`}
              error={errors[field.name]}
              hint={field.hint}
              required={field.required}
            >
              {field.type === "textarea" ? (
                <Textarea
                  id={`field-${field.name}`}
                  rows={4}
                  value={form[field.name] ?? ""}
                  invalid={Boolean(errors[field.name])}
                  placeholder={field.placeholder}
                  onChange={(event) => setValue(field.name, event.target.value)}
                />
              ) : field.type === "image" ? (
                <ImageField
                  value={form[field.name] ?? ""}
                  onChange={(value) => setValue(field.name, value)}
                />
              ) : (
                <Input
                  id={`field-${field.name}`}
                  value={form[field.name] ?? ""}
                  invalid={Boolean(errors[field.name])}
                  placeholder={field.placeholder}
                  onChange={(event) => setValue(field.name, event.target.value)}
                />
              )}
            </Field>
          ))}
        </form>
      </Modal>

      <ConfirmDialog
        open={pendingDelete !== null}
        title={`Hapus ${itemLabel} ini?`}
        message={
          pendingDelete
            ? `"${primary(pendingDelete).title}" akan dihapus permanen dari data demo.`
            : ""
        }
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default ContentManager;
