# Supabase 개발 가이드

Next.js 프로젝트에서 Supabase를 사용하는 모든 패턴과 모범 사례를 정의합니다.

---

## 1. Supabase 클라이언트 설정

### 1.1 서버 클라이언트 (SSR)

```typescript
// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // 쿠키 설정 실패 (버전 호환성)
          }
        },
      },
    }
  );
}
```

**사용 시기:**
- ✅ Server Component
- ✅ Server Action
- ✅ API Route
- ✅ 미들웨어

**중요:** 매 호출마다 새 인스턴스 생성 (Fluid Compute 호환)

### 1.2 클라이언트 클라이언트

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
```

**사용 시기:**
- ✅ Client Component (`"use client"`)
- ✅ React Hooks (useEffect 등)
- ❌ Server Component에서 사용 금지

### 1.3 환경 변수

```env
# .env.local (공개금지!)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5...
```

**규칙:**
- ✅ NEXT_PUBLIC_: 클라이언트에서 접근 가능
- 🚫 절대 커밋금지 (`.gitignore` 확인)

---

## 2. 인증 패턴

### 2.1 사용자 인증 확인

```typescript
// Server Component 또는 Server Action
import { createClient } from "@/lib/supabase/server";

async function protectedOperation() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("사용자 인증이 필요합니다");
  }

  // user.id = 사용자 UUID
  // user.email = 사용자 이메일
  // user.user_metadata = 추가 정보
  return user;
}
```

**패턴:**
- ✅ 항상 null 체크
- ✅ 에러 처리
- ✅ user.id 타입: UUID (문자열)

### 2.2 회원가입

```typescript
// lib/actions/auth.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string
) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  // 이메일 확인 필요 시
  if (!data.session) {
    return { message: "확인 이메일을 확인하세요" };
  }

  redirect("/protected");
}
```

**옵션:**
- `options.data`: 사용자 메타데이터
- `options.emailRedirectTo`: 확인 이메일 리다이렉트 URL

### 2.3 로그인

```typescript
export async function signInWithEmail(
  email: string,
  password: string
) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/protected");
}
```

### 2.4 Google OAuth

```typescript
// 1. 로그인 버튼 클릭 (클라이언트)
"use client";
export function GoogleLoginButton() {
  async function handleClick() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Google 로그인 실패:", error);
    }
  }

  return <button onClick={handleClick}>Google로 로그인</button>;
}

// 2. 콜백 처리 (Server)
// app/auth/callback/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      // 프로필 자동 생성
      await createProfile(user?.email || "", user?.user_metadata?.full_name || "");
      
      return NextResponse.redirect(
        new URL("/protected", request.url)
      );
    }
  }

  return NextResponse.redirect(
    new URL("/auth/error", request.url)
  );
}
```

### 2.5 로그아웃

```typescript
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}
```

---

## 3. 데이터베이스 쿼리

### 3.1 SELECT (조회)

```typescript
// 단일 레코드 조회
const { data: profile, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", userId)
  .single(); // 정확히 1개 반환 (없으면 에러)

if (error) {
  console.error("조회 실패:", error.message);
}

// 여러 레코드 조회
const { data: profiles, error } = await supabase
  .from("profiles")
  .select("*")
  .limit(10);

// 선택적 필드만 조회
const { data } = await supabase
  .from("profiles")
  .select("id, email, full_name"); // 선택된 컬럼만

// 필터링
const { data } = await supabase
  .from("profiles")
  .select("*")
  .eq("email", email)              // 정확히 일치
  .gt("created_at", "2024-01-01")  // 초과
  .lt("age", 30)                   // 미만
  .is("deleted_at", null);         // NULL 체크

// 정렬
const { data } = await supabase
  .from("profiles")
  .select("*")
  .order("created_at", { ascending: false }); // 내림차순

// 페이지네이션
const { data } = await supabase
  .from("profiles")
  .select("*")
  .range(0, 9); // 0-9 (첫 10개)
```

**패턴:**
- ✅ 에러 항상 체크
- ✅ 필요한 필드만 선택 (성능)
- ✅ 필터 조건 체인 가능

### 3.2 INSERT (삽입)

```typescript
// 단일 삽입
const { data, error } = await supabase
  .from("profiles")
  .insert({
    id: userId,
    email: userEmail,
    full_name: "홍길동",
  })
  .select()
  .single();

if (error) {
  if (error.code === "23505") {
    // Unique 제약 위반 (중복)
    console.error("이미 존재하는 프로필입니다");
  } else {
    console.error("삽입 실패:", error.message);
  }
}

// 여러 개 삽입
const { data, error } = await supabase
  .from("profiles")
  .insert([
    { id: user1Id, email: "user1@example.com" },
    { id: user2Id, email: "user2@example.com" },
  ])
  .select();
```

**에러 코드:**
- `23505`: Unique constraint violation
- `23503`: Foreign key constraint violation

### 3.3 UPDATE (수정)

```typescript
// 단일 레코드 수정
const { data, error } = await supabase
  .from("profiles")
  .update({
    full_name: "새로운 이름",
    updated_at: new Date(),
  })
  .eq("id", userId) // 조건
  .select()
  .single();

// 여러 레코드 수정
const { data, error } = await supabase
  .from("profiles")
  .update({ is_active: false })
  .gt("updated_at", "2024-01-01") // 조건: 2024년 이후 수정
  .select();
```

**주의:**
- ✅ `.eq()` 등 조건 필수 (전체 테이블 수정 방지)
- ✅ 조건 없으면 에러 발생

### 3.4 DELETE (삭제)

```typescript
// 단일 레코드 삭제
const { error } = await supabase
  .from("profiles")
  .delete()
  .eq("id", userId);

// 여러 레코드 삭제
const { error } = await supabase
  .from("profiles")
  .delete()
  .is("deleted_at", null); // 삭제 표시 안 된 것만
```

**주의:**
- ✅ 조건 필수 (전체 테이블 삭제 방지)

---

## 4. RLS (Row Level Security)

### 4.1 RLS 정책 설정

```sql
-- profiles 테이블: 사용자는 자신의 프로필만 조회/수정
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- SELECT 정책
CREATE POLICY "사용자는 자신의 프로필만 조회"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- UPDATE 정책
CREATE POLICY "사용자는 자신의 프로필만 수정"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- INSERT 정책 (수정 금지)
CREATE POLICY "프로필은 자동 생성만 허용"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- DELETE 정책
CREATE POLICY "프로필은 삭제 불가"
  ON profiles FOR DELETE
  USING (false); -- 항상 거부
```

### 4.2 RLS 테스트

```typescript
// ✅ 성공: 자신의 프로필 조회
const { data } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", currentUserId)
  .single();

// ❌ 실패: 다른 사용자 프로필 조회 (RLS)
const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", otherUserId)
  .single();

// error: "new row violates row-level security policy"
```

**규칙:**
- ✅ 모든 테이블에 RLS 활성화
- ✅ 정책이 없으면 SELECT 불가능
- ✅ RLS 정책은 마이그레이션에 포함

---

## 5. Realtime 구독

### 5.1 기본 구독

```typescript
// components/notifications-listener.tsx
"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function NotificationsListener() {
  useEffect(() => {
    const supabase = createClient();

    // notifications 테이블 구독
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT", // 신규 알림만
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${currentUserId}`, // 현재 사용자만
        },
        (payload) => {
          console.log("신규 알림:", payload.new);
          // UI 업데이트
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
```

**이벤트 타입:**
- `INSERT`: 새 레코드 생성
- `UPDATE`: 레코드 수정
- `DELETE`: 레코드 삭제
- `*`: 모든 이벤트

### 5.2 필터링

```typescript
channel = supabase
  .channel("users")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "profiles",
      filter: "is_online=eq.true", // 온라인 사용자만
    },
    (payload) => console.log(payload)
  )
  .subscribe();
```

---

## 6. Storage (파일 저장)

### 6.1 파일 업로드

```typescript
// Server Action 또는 API Route
import { createClient } from "@/lib/supabase/server";

export async function uploadAvatar(formData: FormData) {
  const file = formData.get("file") as File;
  
  if (!file) {
    throw new Error("파일이 필요합니다");
  }

  // 파일 검증
  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일만 업로드 가능합니다");
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB
    throw new Error("파일 크기는 5MB 이하여야 합니다");
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("사용자 인증이 필요합니다");
  }

  // 파일 경로: avatars/{userId}/profile.jpg
  const filePath = `${user.id}/profile`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600", // 1시간 캐시
      upsert: true, // 기존 파일 덮어쓰기
    });

  if (error) {
    throw new Error(`파일 업로드 실패: ${error.message}`);
  }

  // 공개 URL 생성
  const { data: { publicUrl } } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  // 프로필 업데이트
  await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  return publicUrl;
}
```

### 6.2 파일 다운로드

```typescript
const { data, error } = await supabase.storage
  .from("avatars")
  .download(`${userId}/profile`);

if (error) {
  console.error("다운로드 실패:", error);
}

// data는 Blob
const url = URL.createObjectURL(data);
```

### 6.3 파일 삭제

```typescript
const { error } = await supabase.storage
  .from("avatars")
  .remove([`${userId}/profile`]);

if (error) {
  console.error("삭제 실패:", error);
}
```

### 6.4 Storage RLS 정책

```sql
-- Storage bucket 정책
-- 사용자는 자신의 폴더만 접근 가능
CREATE POLICY "사용자는 자신의 파일만 업로드"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "사용자는 자신의 파일만 삭제"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- 공개 읽기 (모두)
CREATE POLICY "모두 읽기 가능"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
```

---

## 7. 마이그레이션

### 7.1 마이그레이션 생성

```bash
# 로컬 마이그레이션 생성
supabase migration new add_social_links

# 파일: supabase/migrations/20240904_add_social_links.sql
```

### 7.2 마이그레이션 작성

```sql
-- supabase/migrations/20240904_add_social_links.sql
ALTER TABLE profiles ADD COLUMN github_url TEXT;
ALTER TABLE profiles ADD COLUMN linkedin_url TEXT;
ALTER TABLE profiles ADD COLUMN twitter_url TEXT;
ALTER TABLE profiles ADD COLUMN is_public BOOLEAN DEFAULT false;

-- RLS 정책 업데이트 (필요 시)
CREATE POLICY "공개 프로필 조회"
  ON profiles FOR SELECT
  USING (is_public = true OR auth.uid() = id);
```

### 7.3 마이그레이션 적용

```bash
# 로컬 환경에 적용
supabase db push

# 프로덕션 환경에 적용 (Vercel)
# 자동으로 실행되거나 수동으로 Supabase Dashboard에서 실행
```

---

## 8. 에러 처리

### 8.1 일반적인 에러

```typescript
try {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .single();

  if (error) {
    switch (error.code) {
      case "PGRST116": // 결과 없음
        console.error("프로필을 찾을 수 없습니다");
        break;
      case "23505": // Unique violation
        console.error("이미 존재하는 레코드입니다");
        break;
      case "42P01": // Table not found
        console.error("테이블이 존재하지 않습니다");
        break;
      default:
        console.error("오류:", error.message);
    }
    throw error;
  }

  return data;
} catch (error) {
  console.error("쿼리 실패:", error);
  throw new Error("데이터 조회 중 오류가 발생했습니다");
}
```

### 8.2 인증 에러

```typescript
const { data: { user }, error } = await supabase.auth.getUser();

if (error?.status === 401) {
  console.error("사용자 인증이 필요합니다");
  // 로그인 페이지로 리다이렉트
}
```

---

## 9. 성능 최적화

### 9.1 필요한 필드만 선택

```typescript
// ❌ 비효율
const { data } = await supabase
  .from("profiles")
  .select("*"); // 모든 필드

// ✅ 효율
const { data } = await supabase
  .from("profiles")
  .select("id, email, full_name"); // 필요한 필드만
```

### 9.2 배치 작업

```typescript
// ❌ 비효율: 여러 번 쿼리
for (const id of userIds) {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
}

// ✅ 효율: 한 번에 쿼리
const { data } = await supabase
  .from("profiles")
  .select("*")
  .in("id", userIds);
```

### 9.3 페이지네이션

```typescript
// ✅ 페이지네이션
const pageSize = 10;
const page = 1;

const { data, count } = await supabase
  .from("profiles")
  .select("*", { count: "exact" })
  .range(page * pageSize, (page + 1) * pageSize - 1);

const totalPages = Math.ceil((count || 0) / pageSize);
```

---

## 10. 금지 사항 (DO NOT)

```typescript
// ❌ 금지: 클라이언트에서 server.ts 사용
"use client";
import { createClient } from "@/lib/supabase/server"; // 🚫 금지!

// ❌ 금지: 인증 체크 없이 데이터 수정
const { error } = await supabase
  .from("profiles")
  .update(data)
  .eq("id", userId); // getUser() 확인 없음

// ❌ 금지: RLS 정책 없이 테이블 생성
CREATE TABLE sensitive_data (
  id UUID PRIMARY KEY,
  data TEXT
);
-- RLS 정책 없음! 모두 접근 가능

// ❌ 금지: 조건 없이 DELETE/UPDATE
await supabase
  .from("profiles")
  .delete(); // 전체 테이블 삭제!

// ❌ 금지: 환경 변수 하드코딩
const url = "https://specific.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5...";

// ❌ 금지: 민감한 정보를 public URL에 노출
const { data: { publicUrl } } = supabase.storage
  .from("private-data") // public이 아닌 bucket
  .getPublicUrl("secret.pdf"); // 공개 URL 생성 금지!
```

---

## 11. Supabase CLI

### 11.1 로컬 환경 설정

```bash
# Supabase 설치
npm install -g supabase

# 프로젝트 초기화
supabase init

# 로컬 서버 시작
supabase start

# 마이그레이션 생성
supabase migration new create_users_table

# 마이그레이션 적용
supabase db push

# 로컬 서버 중지
supabase stop
```

### 11.2 타입 생성

```bash
# TypeScript 타입 자동 생성
supabase gen types typescript --linked > lib/types/database.ts
```

---

## 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript SDK](https://supabase.com/docs/reference/javascript)
- [RLS 정책 작성](https://supabase.com/docs/guides/auth/row-level-security)
- [프로젝트 shrimp-rules](../shrimp-rules.md)
- [프로젝트 Next.js 가이드](./next-js.md)

---

**문서 버전**: 1.0  
**최종 업데이트**: 2026-09-04  
**Supabase 버전**: ssr@0.4.0+
