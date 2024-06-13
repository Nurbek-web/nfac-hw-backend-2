import { Spinner } from "@/components/ui/spinner";

export default function LoadingPage() {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Spinner size="large" />
      </div>
    </>
  );
}
