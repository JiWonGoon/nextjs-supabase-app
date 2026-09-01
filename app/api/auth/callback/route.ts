import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  console.log("OAuth 콜백 시작");
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  console.log("코드:", code ? "있음" : "없음");

  if (code) {
    const supabase = await createClient();
    console.log("Supabase 클라이언트 생성");

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("세션 교환 결과:", error ? `에러: ${error.message}` : "성공");

    if (!error) {
      // 인증 성공 후 프로필 자동 생성 시도
      const { data: sessionData } = await supabase.auth.getSession();
      console.log("세션 데이터:", sessionData?.session?.user?.email || "없음");

      if (sessionData?.session?.user) {
        const user = sessionData.session.user;
        const origin = request.headers.get("origin") || "http://localhost:3000";
        console.log("프로필 생성 요청 시작:", { email: user.email, origin });

        try {
          const response = await fetch(`${origin}/api/profile/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionData.session.access_token}`,
            },
            body: JSON.stringify({
              email: user.email,
              full_name: user.user_metadata?.full_name,
              avatar_url: user.user_metadata?.avatar_url,
            }),
          });

          console.log("프로필 생성 응답:", response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`프로필 생성 실패: ${response.status} - ${errorText}`);
          } else {
            const result = await response.json();
            console.log("프로필 생성 성공:", result);
          }
        } catch (error) {
          console.error("프로필 생성 요청 실패:", error);
        }
      } else {
        console.log("세션 사용자가 없음");
      }

      console.log("/protected로 리다이렉트");
      return redirect("/protected");
    }
  }

  console.log("/auth/error로 리다이렉트");
  return redirect("/auth/error");
}
