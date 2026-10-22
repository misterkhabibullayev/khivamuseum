import { Loader2 } from "lucide-react";

export default function MainLoading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-light-main dark:bg-dark-main flex items-center justify-center">
      <Loader2 className="w-20 h-20 animate-spin text-link-hover" />
    </div>
  );
}
