import { z } from "zod";

// Supabase profiles 테이블 타입
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

// 프로필 수정 폼 검증 스키마
export const updateProfileSchema = z.object({
  full_name: z.string().min(1, "이름은 필수입니다").max(100, "이름은 100자 이하여야 합니다"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
