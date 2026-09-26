import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

import { Button } from "../components/ui/Button";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Compass className="h-6 w-6" />
      </div>
      <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight text-slate-900">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-600">
        Alamat yang kamu buka tidak ada atau sudah dipindahkan.
      </p>
      <Button as={Link} to="/" className="mt-8">
        Kembali ke beranda
      </Button>
    </div>
  );
}

export default NotFound;
