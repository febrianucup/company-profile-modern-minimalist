import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, LogIn, Mail, ShieldCheck } from "lucide-react";

import Logo from "../assets/logo.png";
import { Button } from "../components/ui/Button";
import { Field, Input } from "../components/ui/Field";
import { login, useAuth } from "../lib/auth";
import { DEMO_CREDENTIALS } from "../lib/store";

function Login() {
  const session = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Navigate to={from} replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    const result = login(email, password, remember);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(from, { replace: true });
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError("");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden flex-col justify-between bg-brand-700 p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <img src={Logo} alt="Logo B0MBER Softgen" className="h-10 w-auto object-contain" />
          <span className="font-heading text-lg font-semibold tracking-tight">
            B0MBER Softgen
          </span>
        </Link>

        <div className="max-w-md">
          <h2 className="font-heading text-3xl font-semibold leading-tight">
            Dashboard admin untuk konten company profile.
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-white/85">
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              Kelola proyek, layanan, dan anggota tim langsung dari browser.
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              Semua pesan dari form kontak masuk ke inbox admin.
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              Data demo tersimpan di localStorage browser ini.
            </li>
          </ul>
        </div>

        <p className="font-mono text-xs text-white/60">
          © {new Date().getFullYear()} B0MBER Softgen
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke situs
          </Link>

          <div className="mt-8 flex items-center gap-3 lg:hidden">
            <img src={Logo} alt="Logo B0MBER Softgen" className="h-10 w-auto object-contain" />
            <span className="font-heading text-lg font-semibold tracking-tight">
              B0MBER Softgen
            </span>
          </div>

          <h1 className="mt-6 font-heading text-2xl font-semibold tracking-tight text-slate-900">
            Masuk ke dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Gunakan akun admin untuk mengelola konten situs.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </p>
            )}

            <Field label="Email" htmlFor="login-email" required>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@bombersoftgen.com"
                  className="pl-9"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </Field>

            <Field label="Password" htmlFor="login-password" required>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            <label className="flex items-center gap-2.5 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-brand-600"
              />
              Ingat saya di perangkat ini
            </label>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Masuk
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Akun demo
            </p>
            <p className="mt-1.5 font-mono text-xs text-slate-700">
              {DEMO_CREDENTIALS.email} · {DEMO_CREDENTIALS.password}
            </p>
            <Button variant="ghost" size="sm" className="mt-3" onClick={fillDemo}>
              Isi otomatis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
