import { redirect } from "next/navigation";

/** Keep old links useful while the portfolio presents all projects in one Work section. */
export default function ProjectsPage() {
  redirect("/#work");
}
