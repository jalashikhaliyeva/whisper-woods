"use client";

import { AdminSidebarProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin" },
  { name: "Hero Images", href: "/admin/hero" },
  { name: "Collections", href: "/admin/collections" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-neutral-950 text-white flex flex-col">
      <div className="px-6 py-8">
        <h1 className="text-lg font-semibold tracking-tight">Whisper Woods</h1>
        <p className="text-xs text-neutral-500 mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 px-3">
        <div className="space-y-0.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="px-3 py-6 border-t border-white/10">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-2.5 text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
