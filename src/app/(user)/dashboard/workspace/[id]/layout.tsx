"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { LayoutGrid, Users, UserPlus, ArrowLeft } from "lucide-react";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const workspaceId = params.id as string;

  const navItems = [
    {
      name: "Projects",
      href: `/dashboard/workspace/${workspaceId}/projects`,
      icon: LayoutGrid,
    },
    {
      name: "Members",
      href: `/dashboard/workspace/${workspaceId}/members`,
      icon: Users,
    },
    {
      name: "Invite",
      href: `/dashboard/workspace/${workspaceId}/invite`,
      icon: UserPlus,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FFFDF5] text-black">
      {/* Sidebar */}
      <aside className="w-64 border-r-4 border-black bg-white p-6 flex flex-col justify-between">
        <div>
          {/* Back to Workspaces */}
          <Link
            href="/dashboard"
            className="mb-8 flex items-center gap-2 border-2 border-black bg-[#FFD93D] p-2 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffe056]"
          >
            <ArrowLeft className="h-4 w-4 stroke-3" /> All Workspaces
          </Link>

          <h2 className="mb-6 text-sm font-black uppercase tracking-wider text-gray-500">
            Workspace Menu
          </h2>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 border-2 border-black p-3 font-extrabold uppercase transition-all ${
                    isActive
                      ? "bg-[#FF6B6B] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-0.5"
                      : "bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <Icon className="h-5 w-5 stroke-[2.5]" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t-2 border-black pt-4 text-xs font-bold uppercase text-gray-500">
          ID: {workspaceId.slice(0, 8)}...
        </div>
      </aside>

      {/* Main Workspace Content Area */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
