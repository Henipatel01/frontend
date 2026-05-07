"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";

export function useAuthGuard() {
  const token = useStore((state) => state.token);
  const loadToken = useStore((state) => state.loadToken);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    loadToken();        
    setChecked(true);  
  }, []);

  useEffect(() => {
    if (checked && !token) {
      router.push("/login");
    }
  }, [checked, token]);

    return { ready: checked && !!token };
}