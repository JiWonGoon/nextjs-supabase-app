"use client";

import { useState, useEffect } from "react";
import { ProfileForm } from "@/components/profile-form";
import { Profile } from "@/lib/types/profile";
import { useRouter } from "next/navigation";

/**
 * 프로필 관리 페이지 - 보호된 라우트
 */
export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/auth/login");
            return;
          }
          throw new Error("프로필을 불러올 수 없습니다");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <p className="text-gray-500">프로필 로딩 중...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <p className="text-red-500">{error || "프로필을 찾을 수 없습니다"}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">프로필</h1>
          <p className="text-gray-600 mt-2">당신의 프로필 정보를 관리하세요</p>
        </div>
        <ProfileForm profile={profile} onProfileUpdate={setProfile} />
      </div>
    </div>
  );
}
