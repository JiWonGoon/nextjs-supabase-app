"use client";

import { useState } from "react";
import { Profile, UpdateProfileInput } from "@/lib/types/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileFormProps {
  profile: Profile;
  onProfileUpdate: (profile: Profile) => void;
}

/**
 * 프로필 수정 폼 컴포넌트
 */
export function ProfileForm({ profile, onProfileUpdate }: ProfileFormProps) {
  const [fullName, setFullName] = useState(profile.full_name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const input: UpdateProfileInput = {
        full_name: fullName,
      };

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "프로필 수정 실패");
      }

      const updatedProfile = await response.json();
      onProfileUpdate(updatedProfile);
      setSuccess(true);

      // 3초 후 성공 메시지 숨기기
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필 정보</CardTitle>
        <CardDescription>당신의 기본 정보를 수정할 수 있습니다</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이메일 (읽기 전용) */}
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" value={profile.email} disabled />
          </div>

          {/* 이름 */}
          <div className="space-y-2">
            <Label htmlFor="full-name">이름</Label>
            <Input
              id="full-name"
              type="text"
              placeholder="이름을 입력하세요"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* 성공 메시지 */}
          {success && <p className="text-sm text-green-500">프로필이 수정되었습니다!</p>}

          {/* 제출 버튼 */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "수정 중..." : "프로필 수정"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
