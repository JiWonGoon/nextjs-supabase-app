"use server";

import { createClient } from "@/lib/supabase/server";
import { Profile, UpdateProfileInput } from "@/lib/types/profile";

/**
 * 현재 사용자의 프로필 조회
 */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("사용자 인증이 필요합니다");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("프로필 조회 에러:", error);
    throw error;
  }

  return data;
}

/**
 * 프로필 생성 (회원가입 후 호출)
 */
export async function createProfile(email: string, fullName?: string): Promise<Profile> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("사용자 인증이 필요합니다");
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        id: user.id,
        email,
        full_name: fullName || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("프로필 생성 에러:", error);
    throw error;
  }

  return data;
}

/**
 * 프로필 수정
 */
export async function updateProfile(input: UpdateProfileInput): Promise<Profile> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("사용자 인증이 필요합니다");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: input.full_name,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    console.error("프로필 수정 에러:", error);
    throw error;
  }

  return data;
}
