import { redirect } from "next/navigation";

import { getUserData } from "@/actions/getUserData";
import {
  getCurrentWorksaceData,
  getUserWorkspaceData,
} from "@/actions/workspaces";

const Workspace = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect("/signin");

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorksaceData(workspaceId);

  return (
    <div>{currentWorkspaceData.name}</div>
  );
};

export default Workspace;
