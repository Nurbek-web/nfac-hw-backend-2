"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SecuredPage({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      console.log("REDIRECT");
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
