"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStorage, User } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("ADMIN" | "CLIENT" | "FIELD")[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authState = authStorage.load();

      if (!authState || !authState.user || !authState.accessToken) {
        router.push("/login");
        return;
      }

      if (allowedRoles && !allowedRoles.includes(authState.user.role)) {
        router.push("/");
        return;
      }

      setUser(authState.user);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
