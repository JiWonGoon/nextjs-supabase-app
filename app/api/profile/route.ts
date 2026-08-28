import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { updateProfileSchema } from "@/lib/types/profile";

/**
 * GET /api/profile - 현재 사용자의 프로필 조회
 */
export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "사용자 인증이 필요합니다" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("프로필 조회 에러:", error);
      return NextResponse.json(
        { error: "프로필을 조회할 수 없습니다" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API 에러:", error);
    return NextResponse.json({ error: "서버 에러가 발생했습니다" }, { status: 500 });
  }
}

/**
 * PUT /api/profile - 프로필 수정
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // 입력값 검증
    const validationResult = updateProfileSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors },
        { status: 400 },
      );
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
      .update({
        full_name: validationResult.data.full_name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      console.error("프로필 수정 에러:", error);
      return NextResponse.json(
        { error: "프로필을 수정할 수 없습니다" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API 에러:", error);
    return NextResponse.json({ error: "서버 에러가 발생했습니다" }, { status: 500 });
  }
}
