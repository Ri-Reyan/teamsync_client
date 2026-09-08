"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Folder, Loader2 } from "lucide-react";
import { api } from "@/lib/axios";
import CreateWorkspaceModal from "../_components/CreateWorkspaceModal";

interface Workspace {
  id: string;
  name: string;
}

export default function DashboardPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchWorkspaces = async () => {
    try {
      const res = await api.get("/user/workspace");
      if (res.data.success) {
        setWorkspaces(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      await fetchWorkspaces();
      setLoading(false);
    };
    initialFetch();
  }, []);

  const handleSuccess = () => {
    fetchWorkspaces();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FFFDF5]">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF5] p-8 font-sans text-black">
      {/* Header */}
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b-4 border-black pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Dashboard
          </h1>
          <p className="font-semibold text-gray-700">
            Select or manage your workspaces
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 border-3 border-black bg-[#FF6B6B] px-5 py-2.5 font-black uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <Plus className="h-5 w-5 stroke-3" /> Add Workspace
        </button>
      </div>

      {/* Workspace List or Empty State */}
      <div className="mx-auto max-w-6xl pt-8">
        {workspaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-3 border-black bg-white p-12 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <Folder className="mb-4 h-16 w-16 text-black" />
            <h2 className="text-xl font-bold uppercase">No Workspaces Found</h2>
            <p className="mb-6 font-medium text-gray-600">
              Create your first workspace to start collaborating.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="border-2 border-black bg-[#FFD93D] px-4 py-2 font-black uppercase"
            >
              Create One Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((ws) => (
              <Link
                key={ws.id}
                href={`/dashboard/workspace/${ws.id}`}
                className="group border-3 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-3">
                  <div className="border-2 border-black bg-[#4D96FF] p-3 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Folder className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase group-hover:underline">
                      {ws.name}
                    </h3>
                    <p className="text-xs font-bold text-gray-500">
                      Click to view projects
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
