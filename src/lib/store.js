/**
 * Tiny client-side data store for the demo admin panel.
 *
 * Everything lives in localStorage so the site works as a static SPA with no
 * backend. All reads/writes go through this module, which means swapping in a
 * real API later only requires rewriting the functions below (`db.*`) — the
 * pages never touch localStorage directly.
 *
 * Shape:
 *   settings  — site-wide content shown on the public pages
 *   projects  — portfolio cards ("Services" section)
 *   services  — timeline steps ("how we work")
 *   team      — team members marquee ("About" section)
 *   messages  — contact form inbox
 *   users     — admin accounts (demo only: passwords are stored in plain text)
 */
import { useSyncExternalStore } from "react";

import hero from "../assets/hero.png";
import peoplePict from "../assets/peoplePict.png";
import peoplePict2 from "../assets/peoplePict2.png";

const DB_KEY = "bomber.db.v1";

/** Images an admin can pick from without uploading anything. */
export const IMAGE_PRESETS = [
  { label: "Hero illustration", value: hero },
  { label: "People 1", value: peoplePict },
  { label: "People 2", value: peoplePict2 },
];

export const DEMO_CREDENTIALS = {
  email: "admin@bombersoftgen.com",
  password: "admin123",
};

const seed = {
  settings: {
    companyName: "B0MBER Softgen",
    tagline: "#1 Software House to Develop All Your Digital Needs",
    headline: "Welcome to",
    intro:
      "Bomber Software House adalah mitra pengembangan perangkat lunak yang berfokus pada efisiensi, performa, dan desain modern. Kami membantu bisnis dan startup mentransformasi ide menjadi aplikasi web serta sistem enterprise yang andal, aman, dan siap tumbuh bersamamu.",
    description:
      "Solusi pengembangan perangkat lunak untuk bisnis digital dan tim modern.",
    email: "bombersoftgen@gmail.com",
    phone: "+62 813-4767-575",
    whatsapp: "https://wa.me/6283134767575",
    address: "Situbondo, Jawa Timur, Indonesia",
    github: "https://github.com/febrianucup",
    socials: [
      { label: "Instagram", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
  projects: [
    {
      id: "p_1",
      title: "E-Commerce Dashboard",
      description:
        "Platform analitik penjualan modern dengan fitur real-time tracking dan manajemen stok otomatis.",
      image: hero,
      link: "#Contact",
      createdAt: "2026-01-04T08:00:00.000Z",
    },
    {
      id: "p_2",
      title: "Aplikasi Kesehatan Mental",
      description:
        "Aplikasi mobile interaktif untuk melacak suasana hati dan kebiasaan harian.",
      image: peoplePict,
      link: "#Contact",
      createdAt: "2026-01-03T08:00:00.000Z",
    },
    {
      id: "p_3",
      title: "Website Perusahaan",
      description: "Website arsitektur modern: portofolio online untuk biro arsitek.",
      image: peoplePict2,
      link: "#Contact",
      createdAt: "2026-01-02T08:00:00.000Z",
    },
    {
      id: "p_4",
      title: "Manajer Keuangan Pribadi",
      description: "Alat web untuk mencatat pengeluaran dan mengatur anggaran bulanan.",
      image: hero,
      link: "#Contact",
      createdAt: "2026-01-01T08:00:00.000Z",
    },
  ],
  services: [
    {
      id: "s_1",
      title: "Konsultasi Pengembangan Web",
      description:
        "Merancang arsitektur dan roadmap teknis yang sesuai kebutuhan bisnis Anda.",
      createdAt: "2026-01-02T08:00:00.000Z",
    },
    {
      id: "s_2",
      title: "Desain UI/UX",
      description: "Antarmuka yang enak dipakai, dibangun dari riset pengguna nyata.",
      createdAt: "2026-01-01T08:00:00.000Z",
    },
  ],
  team: [
    { id: "t_1", name: "Lanang", role: "CEO Founder", image: peoplePict, createdAt: "2026-01-05T08:00:00.000Z" },
    { id: "t_2", name: "Haris", role: "CEO Founder", image: peoplePict2, createdAt: "2026-01-04T08:00:00.000Z" },
    { id: "t_3", name: "Rizal", role: "CEO Founder", image: peoplePict, createdAt: "2026-01-03T08:00:00.000Z" },
    { id: "t_4", name: "Ozi", role: "CEO Founder", image: peoplePict2, createdAt: "2026-01-02T08:00:00.000Z" },
    { id: "t_5", name: "Febri", role: "CEO Founder", image: peoplePict, createdAt: "2026-01-01T08:00:00.000Z" },
  ],
  messages: [],
  users: [
    {
      id: "u_1",
      name: "Admin B0MBER",
      email: DEMO_CREDENTIALS.email,
      password: DEMO_CREDENTIALS.password,
      role: "admin",
    },
  ],
};

export const COLLECTIONS = ["projects", "services", "team", "messages"];

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

function load() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return structuredClone(seed);
    const parsed = JSON.parse(raw);
    // Merge over the seed so older saves keep working when new keys are added.
    const merged = structuredClone(seed);
    for (const key of Object.keys(merged)) {
      if (Array.isArray(merged[key]) ? Array.isArray(parsed[key]) : parsed[key]) {
        merged[key] = parsed[key];
      }
    }
    return merged;
  } catch {
    return structuredClone(seed);
  }
}

let state = load();
const listeners = new Set();

function persist() {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(state));
  } catch {
    // Storage full / disabled: keep working in memory.
  }
}

function commit(next) {
  state = next;
  persist();
  listeners.forEach((listener) => listener());
}

export function getState() {
  return state;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** React hook: re-renders the component whenever any data changes. */
export function useStore() {
  return useSyncExternalStore(subscribe, getState, getState);
}

if (typeof window !== "undefined") {
  // Keep multiple open tabs in sync.
  window.addEventListener("storage", (event) => {
    if (event.key === DB_KEY) commit(load());
  });
}

export const db = {
  add(collection, data) {
    const item = {
      id: uid(collection.slice(0, 1)),
      createdAt: new Date().toISOString(),
      ...data,
    };
    commit({ ...state, [collection]: [item, ...state[collection]] });
    return item;
  },

  update(collection, id, patch) {
    commit({
      ...state,
      [collection]: state[collection].map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  },

  remove(collection, id) {
    commit({
      ...state,
      [collection]: state[collection].filter((item) => item.id !== id),
    });
  },

  /** Move an item one slot up/down — used to control display order. */
  move(collection, id, direction) {
    const items = [...state[collection]];
    const index = items.findIndex((item) => item.id === id);
    const target = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    commit({ ...state, [collection]: items });
  },

  updateSettings(patch) {
    commit({ ...state, settings: { ...state.settings, ...patch } });
  },

  addMessage(data) {
    return db.add("messages", { read: false, ...data });
  },

  setMessageRead(id, read) {
    db.update("messages", id, { read });
  },

  updateUser(id, patch) {
    db.update("users", id, patch);
  },

  /** Restore the original demo content. */
  reset() {
    commit(structuredClone(seed));
  },
};
