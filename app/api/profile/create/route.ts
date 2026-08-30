import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/profile/create - 프로필 생성 (회원가입 후)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "이메일이 필요합니다" }, { status: 400 });
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "사용자 인증이 필요합니다" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          email,
          full_name: null,
        },
      ])
      .select()
      .single();

    if (error) {
      // 프로필이 이미 존재하는 경우 무시
      if (error.code === "23505") {
        return NextResponse.json({ message: "프로필이 이미 존재합니다" });
      }
      console.error("프로필 생성 에러:", error);
      return NextResponse.json({ error: "프로필을 생성할 수 없습니다" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("API 에러:", error);
    return NextResponse.json({ error: "서버 에러가 발생했습니다" }, { status: 500 });
  }
}
