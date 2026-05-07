"use client";

import { useEffect } from "react";
import useStore from "@/store/useStore";

export default function TokenLoader() {
  const loadToken = useStore((state) => state.loadToken);

  useEffect(() => {
    loadToken();
  }, []);

  return null;
}