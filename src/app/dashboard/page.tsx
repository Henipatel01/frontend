
"use client";

import { useAuthGuard } from "@/hook/useAuthGuard";
import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";

export default function Dashboard() {
      const { ready } = useAuthGuard();
  if (!ready) return null;
  useAuthGuard();

  const logout = useStore((state) => state.logout);
  const router = useRouter();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>You are logged in </p>

      <button onClick={() => {
        logout();
        router.push("/login");
      }}>
        Logout
      </button>
    </div>
  );
}