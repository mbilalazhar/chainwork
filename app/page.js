import { redirect } from "next/navigation";

/** The app has no marketing home yet — send visitors into the product. */
export default function RootPage() {
  redirect("/dashboard");
}
