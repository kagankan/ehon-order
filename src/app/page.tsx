import type { Metadata } from "next";
import Home from "./_components/view/Home";

export const metadata: Metadata = {
  title: "えほんはともだち 絵本リスト",
};

export default function Page() {
  return <Home />;
}
