import { getUserData } from "@/actions/getUserClient";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = await getUserData();

  if (!userData) return redirect("/signin");

  return (
    <div>
      <p>Slack</p>
    </div>
  );
}
