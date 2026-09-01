import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/profile/create - 프로필 생성 (회원가입 후)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, full_name, avatar_url } = body;

    console.log("프로필 생성 요청:", { email, full_name, avatar_url });

    if (!email) {
      return NextResponse.json({ error: "이메일이 필요합니다" }, { status: 400 });
    }

    const supabase = await createClient();

    // Authorization 헤더에서 토큰 추출 시도
    const authHeader = request.headers.get("authorization");
    let user = null;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      console.log("토큰 사용하여 사용자 정보 조회");
      const {
        data: { user: tokenUser },
      } = await supabase.auth.getUser(token);
      user = tokenUser;
    } else {
      console.log("쿠키로 사용자 정보 조회");
      const {
        data: { user: cookieUser },
      } = await supabase.auth.getUser();
      user = cookieUser;
    }

    if (!user) {
      console.error("사용자 인증 없음");
      return NextResponse.json({ error: "사용자 인증이 필요합니다" }, { status: 401 });
    }

    console.log("인증 사용자:", user.id, user.email);

    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          email,
          full_name: full_name || null,
          avatar_url: avatar_url || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("DB 에러:", error.code, error.message);
      // 프로필이 이미 존재하는 경우 무시
      if (error.code === "23505") {
        console.log("프로필 이미 존재 - 무시");
        return NextResponse.json({ message: "프로필이 이미 존재합니다" });
      }
      console.error("프로필 생성 에러:", error);
      return NextResponse.json({ error: "프로필을 생성할 수 없습니다" }, { status: 500 });
    }

    console.log("프로필 생성 성공:", data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("API 에러:", error);
    return NextResponse.json({ error: "서버 에러가 발생했습니다" }, { status: 500 });
  }
}
