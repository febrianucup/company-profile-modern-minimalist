import { useState } from "react";
import { RotateCcw, Save } from "lucide-react";

import { Button } from "../../components/ui/Button";
import { Field, Input, Textarea } from "../../components/ui/Field";
import { ConfirmDialog } from "../../components/ui/Modal";
import { PageHeader } from "../../components/ui/Section";
import { useToast } from "../../components/ui/toastContext";
import { updateAccount, useAuth } from "../../lib/auth";
import { db, useStore } from "../../lib/store";

const SITE_FIELDS = [
  { name: "companyName", label: "Nama perusahaan", required: true },
  { name: "tagline", label: "Tagline", required: true, hint: "Teks kecil di atas judul hero." },
  { name: "headline", label: "Kata pembuka hero", required: true },
  { name: "intro", label: "Deskripsi hero", type: "textarea", required: true },
  { name: "description", label: "Deskripsi singkat (footer)", type: "textarea", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Telepon", required: true },
  { name: "whatsapp", label: "Link WhatsApp", hint: "Contoh: https://wa.me/628123456789" },
  { name: "address", label: "Alamat" },
  { name: "github", label: "Link GitHub" },
];

export function SettingsAdmin() {
  const { settings } = useStore();
  const session = useAuth();
  const toast = useToast();

  const [siteForm, setSiteForm] = useState(settings);
  const [accountForm, setAccountForm] = useState({
    name: session?.name ?? "",
    email: session?.email ?? "",
    password: "",
    confirm: "",
  });
  const [accountError, setAccountError] = useState("");
  const [resetOpen, setResetOpen] = useState(false);

  const updateSite = (name, value) => setSiteForm((form) => ({ ...form, [name]: value }));
  const updateAccountField = (name, value) => {
    setAccountForm((form) => ({ ...form, [name]: value }));
    setAccountError("");
  };

  const handleSiteSubmit = (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(
      Object.entries(siteForm).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]),
    );
    db.updateSettings(payload);
    toast("Informasi situs disimpan.");
  };

  const handleAccountSubmit = (event) => {
    event.preventDefault();
    setAccountError("");

    if (!accountForm.name.trim() || !accountForm.email.trim()) {
      setAccountError("Nama dan email wajib diisi.");
      return;
    }
    if (accountForm.password || accountForm.confirm) {
      if (accountForm.password.length < 6) {
        setAccountError("Password minimal 6 karakter.");
        return;
      }
      if (accountForm.password !== accountForm.confirm) {
        setAccountError("Konfirmasi password tidak sama.");
        return;
      }
    }

    const result = updateAccount({
      name: accountForm.name.trim(),
      email: accountForm.email.trim(),
      ...(accountForm.password ? { password: accountForm.password } : {}),
    });

    if (!result.ok) {
      setAccountError(result.error);
      return;
    }

    setAccountForm((form) => ({ ...form, password: "", confirm: "" }));
    toast("Akun admin diperbarui.");
  };

  return (
    <>
      <PageHeader title="Pengaturan" description="Konten situs, akun admin, dan data demo." />

      <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="font-heading text-lg font-semibold tracking-tight text-slate-900">
            Informasi situs
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Teks dan kontak ini dipakai di seluruh halaman publik.
          </p>

          <form onSubmit={handleSiteSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {SITE_FIELDS.slice(0, 2).map((field) => (
                <Field key={field.name} label={field.label} htmlFor={`site-${field.name}`} required={field.required} hint={field.hint}>
                  <Input
                    id={`site-${field.name}`}
                    value={siteForm[field.name] ?? ""}
                    onChange={(event) => updateSite(field.name, event.target.value)}
                  />
                </Field>
              ))}
            </div>

            {SITE_FIELDS.slice(2).map((field) => (
              <Field
                key={field.name}
                label={field.label}
                htmlFor={`site-${field.name}`}
                required={field.required}
                hint={field.hint}
              >
                {field.type === "textarea" ? (
                  <Textarea
                    id={`site-${field.name}`}
                    rows={3}
                    value={siteForm[field.name] ?? ""}
                    onChange={(event) => updateSite(field.name, event.target.value)}
                  />
                ) : (
                  <Input
                    id={`site-${field.name}`}
                    value={siteForm[field.name] ?? ""}
                    onChange={(event) => updateSite(field.name, event.target.value)}
                  />
                )}
              </Field>
            ))}

            <Button type="submit">
              <Save className="h-4 w-4" />
              Simpan informasi situs
            </Button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="font-heading text-lg font-semibold tracking-tight text-slate-900">
            Akun admin
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Ganti nama, email, dan password untuk login ke dashboard.
          </p>

          <form onSubmit={handleAccountSubmit} noValidate className="mt-6 space-y-5">
            {accountError && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {accountError}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nama" htmlFor="account-name" required>
                <Input
                  id="account-name"
                  value={accountForm.name}
                  onChange={(event) => updateAccountField("name", event.target.value)}
                />
              </Field>
              <Field label="Email" htmlFor="account-email" required>
                <Input
                  id="account-email"
                  type="email"
                  value={accountForm.email}
                  onChange={(event) => updateAccountField("email", event.target.value)}
                />
              </Field>
              <Field
                label="Password baru"
                htmlFor="account-password"
                hint="Kosongkan bila tidak ingin mengganti."
              >
                <Input
                  id="account-password"
                  type="password"
                  autoComplete="new-password"
                  value={accountForm.password}
                  onChange={(event) => updateAccountField("password", event.target.value)}
                />
              </Field>
              <Field label="Konfirmasi password" htmlFor="account-confirm">
                <Input
                  id="account-confirm"
                  type="password"
                  autoComplete="new-password"
                  value={accountForm.confirm}
                  onChange={(event) => updateAccountField("confirm", event.target.value)}
                />
              </Field>
            </div>

            <Button type="submit">
              <Save className="h-4 w-4" />
              Simpan akun
            </Button>
          </form>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
          <h2 className="font-heading text-lg font-semibold tracking-tight text-red-800">
            Zona berbahaya
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-red-700/80">
            Semua data demo (proyek, layanan, tim, pesan, pengaturan) tersimpan di
            localStorage browser ini. Reset akan mengembalikannya ke kondisi awal.
          </p>
          <Button variant="danger" className="mt-5" onClick={() => setResetOpen(true)}>
            <RotateCcw className="h-4 w-4" />
            Reset data demo
          </Button>
        </section>
      </div>

      <ConfirmDialog
        open={resetOpen}
        title="Reset semua data demo?"
        message="Perubahan yang sudah kamu buat akan hilang dan konten kembali ke bawaan."
        confirmLabel="Ya, reset"
        onCancel={() => setResetOpen(false)}
        onConfirm={() => {
          db.reset();
          setResetOpen(false);
          toast("Data demo dikembalikan ke kondisi awal.", "info");
        }}
      />
    </>
  );
}

export default SettingsAdmin;
