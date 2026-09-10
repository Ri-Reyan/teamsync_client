"use client";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { LogOut, ArrowLeftRight, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const WorkspaceProjectsPage = () => {
  const router = useRouter();
  const { id: workspaceId } = useParams<{ id: string }>();

  const handleLeaveWorkspace = async (workspaceId: string) => {
    const isConfirmed = confirm(
      "Are you sure you want to leave this workspace?",
    );
    if (!isConfirmed) return;

    try {
      const res = await api.delete(`/user/workspace/${workspaceId}/leave`);
      if (res.data.success) {
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
      }
    }
  };

  const handleTransferOwnership = () => {
    // TODO: Implement Transfer Ownership modal / API call
    console.log("Transfer ownership clicked");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b-4 border-black pb-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-black uppercase tracking-tight">
          Projects
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleLeaveWorkspace(workspaceId)}
            className="flex items-center gap-2 border-2 border-black bg-[#FF6B6B] px-4 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <LogOut className="h-4 w-4 stroke-[2.5]" />
            <span>Leave Workspace</span>
          </button>
          <button
            onClick={handleTransferOwnership}
            className="flex items-center gap-2 border-2 border-black bg-[#FFD93D] px-4 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <ArrowLeftRight className="h-4 w-4 stroke-[2.5]" />
            <span>Transfer Ownership</span>
          </button>

          <button className="flex items-center gap-2 border-2 border-black bg-[#6BCB77] px-4 py-2 text-xs font-black uppercase text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
            <Plus className="h-4 w-4 stroke-3" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      <div className="pt-2">
        <p className="font-bold text-gray-700 text-sm sm:text-base">
          Select a project or create a new one to get started.
        </p>
      </div>
    </div>
  );
};

export default WorkspaceProjectsPage;
