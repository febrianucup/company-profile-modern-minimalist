import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";

import { db, useStore } from "../lib/store";
import { Button } from "./ui/Button";
import { Field, Input, Textarea } from "./ui/Field";

const EMPTY_FORM = { name: "", email: "", company: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Nama wajib diisi.";
  if (!form.email.trim()) {
    errors.email = "Email wajib diisi.";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = "Format email tidak valid.";
  }
  if (!form.message.trim()) {
    errors.message = "Pesan wajib diisi.";
  } else if (form.message.trim().length < 10) {
    errors.message = "Pesan minimal 10 karakter.";
  }
  return errors;
}

export function ContactCard() {
  const { settings } = useStore();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const methods = [
    {
      icon: Mail,
      title: "Email",
      description: "Hubungi kami lewat email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      icon: Phone,
      title: "Telepon / WhatsApp",
      description: "Bicara langsung dengan tim kami",
      value: settings.phone,
      href: settings.whatsapp,
    },
    {
      icon: MapPin,
      title: "Lokasi",
      description: "Kunjungi kantor kami",
      value: settings.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`,
    },
  ];

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    db.addMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      message: form.message.trim(),
    });
    // Small pause so the button state is visible; the data is already saved.
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSending(false);
    setSent(true);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <h3 className="font-heading text-2xl font-semibold tracking-tight text-slate-900">
          Kirim pesan
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Konsultasikan project kamu, kami balas dalam 24 jam.
        </p>

        {sent ? (
          <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-card">
              <CheckCircle2 className="h-7 w-7 text-brand-600" />
            </div>
            <h4 className="mt-4 font-heading text-lg font-semibold text-slate-900">
              Pesan terkirim!
            </h4>
            <p className="mx-auto mt-2 max-w-xs text-sm text-slate-600">
              Terima kasih sudah menghubungi kami. Pesanmu tercatat di inbox admin dan akan
              dibalas dalam 24 jam.
            </p>
            <Button variant="outline" size="sm" className="mt-6" onClick={() => setSent(false)}>
              Kirim pesan lain
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nama" htmlFor="contact-name" error={errors.name} required>
                <Input
                  id="contact-name"
                  value={form.name}
                  invalid={Boolean(errors.name)}
                  placeholder="Nama kamu"
                  onChange={(event) => update("name", event.target.value)}
                />
              </Field>
              <Field label="Email" htmlFor="contact-email" error={errors.email} required>
                <Input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  invalid={Boolean(errors.email)}
                  placeholder="nama@email.com"
                  onChange={(event) => update("email", event.target.value)}
                />
              </Field>
            </div>

            <Field label="Perusahaan" htmlFor="contact-company" hint="Opsional">
              <Input
                id="contact-company"
                value={form.company}
                placeholder="Nama perusahaan"
                onChange={(event) => update("company", event.target.value)}
              />
            </Field>

            <Field label="Pesan" htmlFor="contact-message" error={errors.message} required>
              <Textarea
                id="contact-message"
                rows={5}
                value={form.message}
                invalid={Boolean(errors.message)}
                placeholder="Ceritakan kebutuhan project kamu..."
                onChange={(event) => update("message", event.target.value)}
              />
            </Field>

            <Button type="submit" disabled={sending} className="w-full">
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Kirim pesan
                </>
              )}
            </Button>
          </form>
        )}
      </div>

      <div>
        <h3 className="font-heading text-2xl font-semibold tracking-tight text-slate-900">
          Cara lain menghubungi kami
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Pilih salah satu kanal di bawah ini.
        </p>

        <ul className="mt-8 space-y-4">
          {methods.map((method) => (
            <li key={method.title}>
              <a
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition-all hover:border-brand-200 hover:shadow-soft"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <method.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-900">
                    {method.title}
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    {method.description}
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-slate-700">
                    {method.value}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-brand-600" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactCard;
