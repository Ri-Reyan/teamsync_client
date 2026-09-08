"use client";

const WorkspaceProjectsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <h1 className="text-2xl font-black uppercase">Projects</h1>
        <button className="border-2 border-black bg-[#6BCB77] px-4 py-2 font-black uppercase text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          + Create Project
        </button>
      </div>
      <div className="pt-6">
        <p className="font-semibold text-gray-700">
          Select a project or create a new one to get started.
        </p>
      </div>
    </div>
  );
};

export default WorkspaceProjectsPage;
