import { useAuthContext } from "../contexts/Support";

export default function Toast() {
  const { toast } = useAuthContext();

  return (
    <>
      {toast.show && (
        <div className="w-[300px] py-2 px-3 text-white rounded bg-emerald-500 fixed right-4 bottom-4 z-50 animate-fade-in-down">
          {toast.message}
        </div>
      )}
    </>
  );
}
