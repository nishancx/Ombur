import { FullSpanLoader } from "@/components/fullSpanLoader/fullSpanLoader";

export default function LoadingPage() {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <FullSpanLoader />
    </div>
  );
}
