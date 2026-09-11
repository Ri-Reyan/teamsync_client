"use client";

import {
  TransferOwnershipModal,
  WorkspaceMember,
} from "@/app/(user)/_components/TransferOwnershipModal";
import ConfirmModal from "@/global_components/confirmModal";
import { api } from "@/lib/axios";
import { showToast } from "@/lib/toast";
import { isAxiosError } from "axios";
import { LogOut, ArrowLeftRight, Plus, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const WorkspaceProjectsPage = () => {
  const router = useRouter();
  const { id: workspaceId } = useParams<{ id: string }>();

  // Leave Workspace Modal State
  const [workspaceDetail, setWorkspaceDetail] = useState<{
    title: string;
    id: string;
    message: string;
  }>({
    id: "",
    title: "",
    message: "",
  });

  // Transfer Ownership Modal States
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);

  // ১. Leave Workspace Handler
  const handleLeaveWorkspace = async (targetWorkspaceId: string) => {
    try {
      const res = await api.delete(
        `/user/workspace/${targetWorkspaceId}/leave`,
      );
      if (res.data.success) {
        showToast.success(res.data.message || "Successfully left workspace");
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        showToast.error(
          error.response?.data?.message || "Failed to leave workspace",
        );
      }
    }
  };

  // ২. Fetch Members for Transfer Modal
  const fetchWorkspaceMembers = async () => {
    try {
      const res = await api.get(`/user/workspace/${workspaceId}/members`);
      if (res.data.success) {
        setMembers(res.data.data);
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        showToast.error(
          error.response?.data?.message || "Failed to load workspace members",
        );
      }
    }
  };

  // ৩. Open Transfer Modal & Fetch Data
  const handleOpenTransferModal = async () => {
    setIsTransferOpen(true);
    await fetchWorkspaceMembers();
  };

  // ৪. Handle Final Ownership Transfer Submit
  const handleTransferOwnershipSubmit = async (newOwnerId: string) => {
    try {
      const res = await api.patch(
        `/user/workspace/${workspaceId}/transfer-ownership`,
        {
          newOwnerId,
        },
      );

      if (res.data.success) {
        showToast.success(
          res.data.message || "Ownership transferred successfully!",
        );
        setIsTransferOpen(false);
        // প্রসেস শেষ হলে পেজ রিফ্রেশ বা ড্যাশবোর্ডে রিডাইরেক্ট করা যেতে পারে
        router.refresh();
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        showToast.error(
          error.response?.data?.message || "Failed to transfer ownership",
        );
      }
    }
  };

  const handleDelete = async (workspaceId: string) => {
    try {
      await api.delete(`/user/workspace/${workspaceId}`);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        showToast.error(
          error.response?.data?.message || "Failed to delete worksapce",
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 border-b-4 border-black pb-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-black uppercase tracking-tight">
          Projects
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() =>
              setWorkspaceDetail({
                title: "Delete",
                id: workspaceId,
                message: "Are you sure you want to delete this workspace?",
              })
            }
            className="flex items-center gap-2 border-2 border-black bg-[#FF6B6B] px-4 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <Trash2 className="h-4 w-4 stroke-[2.5]" />
            <span>Delete Workspace</span>
          </button>

          <button
            onClick={() =>
              setWorkspaceDetail({
                id: workspaceId,
                title: "Leave",
                message: "Are you sure you want to leave from this workspace?",
              })
            }
            className="flex items-center gap-2 border-2 border-black bg-[#FF6B6B] px-4 py-2 text-xs font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <LogOut className="h-4 w-4 stroke-[2.5]" />
            <span>Leave Workspace</span>
          </button>

          <button
            onClick={handleOpenTransferModal}
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
        <p className="text-sm font-bold text-gray-700 sm:text-base">
          Select a project or create a new one to get started.
        </p>
      </div>

      {/* Leave Workspace Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(workspaceDetail.title)}
        title={workspaceDetail.title}
        message={workspaceDetail.message}
        onClose={() =>
          setWorkspaceDetail({
            id: "",
            title: "",
            message: "",
          })
        }
        onConfirm={async () => {
          if (
            Boolean(workspaceDetail.title) &&
            workspaceDetail.title === "Leave"
          ) {
            await handleLeaveWorkspace(workspaceDetail.id);
          } else {
            await handleDelete(workspaceDetail.id);
          }
        }}
      />

      {/* Transfer Ownership Modal */}
      <TransferOwnershipModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        members={members}
        onTransferConfirm={handleTransferOwnershipSubmit}
      />
    </div>
  );
};

export default WorkspaceProjectsPage;
