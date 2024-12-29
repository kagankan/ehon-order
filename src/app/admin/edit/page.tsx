import { Suspense } from "react";
import Edit from "../_components/view/edit";

export default function Page() {
  return (
    <Suspense fallback={<div>読込中...</div>}>
      <Edit />
    </Suspense>
  );
}
