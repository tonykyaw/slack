import { getUserData } from "@/actions/getUserData";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = await getUserData();

  if (!userData) return redirect("/signin");

  const userWorkspaceId = userData.workspaces?.[0];

  if (!userWorkspaceId) return redirect('/create-workspace');

  if (userWorkspaceId) return redirect(`/workspace/${userWorkspaceId}`);
}
