# Next.js 15 개발 가이드

Next.js 15 App Router를 기반으로 한 프로젝트의 개발 표준 및 모범 사례를 정의합니다.

---

## 1. 프로젝트 구조

### 1.1 App Router 구조

```
app/
├── layout.tsx              # 루트 레이아웃 (모든 페이지의 부모)
├── page.tsx                # 홈 페이지 (/)
├── globals.css             # 전역 스타일
├── auth/                   # 인증 관련 라우트
│   ├── layout.tsx          # 인증 레이아웃 (선택)
│   ├── login/
│   │   └── page.tsx        # /auth/login
│   ├── sign-up/
│   │   └── page.tsx        # /auth/sign-up
│   ├── forgot-password/
│   │   └── page.tsx        # /auth/forgot-password
│   ├── update-password/
│   │   └── page.tsx        # /auth/update-password
│   ├── callback/
│   │   └── route.ts        # /auth/callback (API 라우트)
│   └── confirm/
│       └── route.ts        # /auth/confirm (API 라우트)
├── protected/              # 인증 필수 라우트
│   ├── layout.tsx          # 보호된 페이지 공통 레이아웃
│   ├── page.tsx            # /protected (대시보드)
│   ├── profile/
│   │   └── page.tsx        # /protected/profile
│   ├── teams/              # 향후 추가
│   │   └── page.tsx
│   └── notifications/      # 향후 추가
│       └── page.tsx
└── api/                    # API 라우트
    ├── auth/
    │   └── callback/
    │       └── route.ts    # /api/auth/callback
    └── profile/
        ├── route.ts        # /api/profile (GET, PUT)
        └── create/
            └── route.ts    # /api/profile/create (POST)
```

### 1.2 라우팅 규칙

| 구조 | 라우트 | 용도 |
|------|--------|------|
| `page.tsx` | 디렉토리명 | 페이지 |
| `layout.tsx` | 디렉토리명 + 하위 | 레이아웃 |
| `route.ts` | 디렉토리명 | API 엔드포인트 |
| `[id]/page.tsx` | 동적 라우트 | `/profile/[userId]` |
| `(group)/page.tsx` | 라우트 그룹 | URL 구조 변경 안 함 |

**규칙:**
- 폴더명은 kebab-case (`auth-callback` ❌, `callback` ✅)
- 파일명은 Next.js 예약어 (page, layout, route, error, loading 등)
- 중첩 구조 = 중첩 라우트 (모든 부모 `layout.tsx` 필수)

---

## 2. 페이지 컴포넌트

### 2.1 기본 페이지 구조

```typescript
// app/protected/profile/page.tsx
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/profile-form";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "프로필 | My App",
  description: "사용자 프로필 관리 페이지",
};

export default async function ProfilePage() {
  // 서버 컴포넌트 - 인증 확인
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // 데이터 조회
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return <div>프로필을 불러올 수 없습니다</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">프로필</h1>
      <ProfileForm initialData={profile} />
    </div>
  );
}
```

**패턴:**
- ✅ 서버 컴포넌트로 인증/데이터 조회
- ✅ `redirect()` 사용 (미인증 시 로그인 페이지)
- ✅ 메타데이터 내보내기
- ✅ 에러 처리

### 2.2 클라이언트 컴포넌트

```typescript
// components/profile-form.tsx
"use client"; // 클라이언트 컴포넌트 표시

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/lib/actions/profile";
import { UpdateProfileSchema } from "@/lib/types/profile";

export function ProfileForm({ initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      full_name: initialData?.full_name || "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      await updateProfile(data);
      // 성공 처리
    } catch (error) {
      // 에러 처리
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* 폼 필드 */}
    </form>
  );
}
```

**규칙:**
- ✅ 클라이언트 상호작용 필요 시 `"use client"` 선언
- ✅ React Hook Form + Zod 검증
- ✅ 로딩 상태 관리
- ✅ Server Action 호출

---

## 3. Layout과 Metadata

### 3.1 루트 레이아웃

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "My App",
    template: "%s | My App",
  },
  description: "Next.js + Supabase 풀스택 애플리케이션",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://myapp.com",
    siteName: "My App",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**규칙:**
- ✅ Metadata 정의 (SEO)
- ✅ ThemeProvider 루트 레이아웃에 적용
- ✅ `html` 태그에 `lang` 속성
- ✅ `suppressHydrationWarning` 주의해서 사용

### 3.2 중첩 레이아웃

```typescript
// app/protected/layout.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 인증 확인 (레이아웃 레벨)
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

**패턴:**
- ✅ 레이아웃에서 인증 체크 (하위 페이지는 검사 건너뜀)
- ✅ 공통 컴포넌트 (Navbar, Footer)
- ✅ 레이아웃 children prop

---

## 4. API 라우트

### 4.1 기본 API 라우트 구조

```typescript
// app/api/profile/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/profile
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "사용자 인증이 필요합니다" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "내부 서버 오류" },
      { status: 500 }
    );
  }
}

// PUT /api/profile
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "사용자 인증이 필요합니다" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { full_name } = body;

    const { data, error } = await supabase
      .from("profiles")
      .update({ full_name, updated_at: new Date() })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "내부 서버 오류" },
      { status: 500 }
    );
  }
}
```

**규칙:**
- ✅ 함수명: GET, POST, PUT, DELETE, PATCH 등
- ✅ NextRequest, NextResponse 타입 사용
- ✅ 항상 인증 확인 (getUser())
- ✅ try-catch 에러 처리
- ✅ 적절한 HTTP 상태 코드 (401, 400, 500)

### 4.2 OAuth 콜백

```typescript
// app/auth/callback/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { createProfile } from "@/lib/actions/profile";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/protected";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 프로필 자동 생성
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await createProfile(user.email || "", user.user_metadata?.full_name || "");
      }
      
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // OAuth 실패
  return NextResponse.redirect(
    new URL("/auth/error?message=OAuth 인증 실패", request.url)
  );
}
```

**패턴:**
- ✅ `code` 쿼리 파라미터 처리
- ✅ `exchangeCodeForSession()` 호출
- ✅ 프로필 자동 생성
- ✅ 성공 시 `next` 파라미터로 리다이렉트

---

## 5. Server Actions

### 5.1 Server Action 작성

```typescript
// lib/actions/profile.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { UpdateProfileSchema } from "@/lib/types/profile";

/**
 * 프로필을 데이터베이스에서 조회합니다.
 */
export async function getProfile() {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("사용자 인증이 필요합니다");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(`프로필 조회 실패: ${error.message}`);
  }

  return data;
}

/**
 * 프로필을 업데이트합니다.
 */
export async function updateProfile(input: UpdateProfileInput) {
  // 입력값 검증
  const validated = UpdateProfileSchema.parse(input);

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("사용자 인증이 필요합니다");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: validated.full_name,
      updated_at: new Date(),
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error(`프로필 수정 실패: ${error.message}`);
  }

  return data;
}

/**
 * 새 프로필을 생성합니다 (회원가입 후 또는 OAuth 로그인 후).
 */
export async function createProfile(
  email: string,
  fullName: string = ""
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("사용자 인증이 필요합니다");
  }

  // 중복 확인
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (existing) {
    return existing; // 이미 존재
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email,
      full_name: fullName,
    })
    .select()
    .single();

  if (error && error.code !== "23505") { // 23505 = unique violation (이미 존재)
    throw new Error(`프로필 생성 실패: ${error.message}`);
  }

  return data;
}
```

**규칙:**
- ✅ `"use server"` 지시문 필수 (파일 상단)
- ✅ 항상 인증 체크
- ✅ Zod 스키마로 입력값 검증
- ✅ JSDoc 주석으로 함수 설명
- ✅ 명확한 에러 메시지

### 5.2 Server Action 호출 (클라이언트)

```typescript
// components/profile-form.tsx
"use client";

import { updateProfile } from "@/lib/actions/profile";
import { useTransition } from "react";

export function ProfileForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const result = await updateProfile({
          full_name: formData.get("full_name") as string,
        });
        console.log("프로필 업데이트 성공:", result);
      } catch (error) {
        console.error("프로필 업데이트 실패:", error);
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="full_name" type="text" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
```

**패턴:**
- ✅ `useTransition()` 훅으로 로딩 상태 관리
- ✅ `startTransition()` 감싸기
- ✅ 에러 처리 (try-catch)

---

## 6. 에러 처리

### 6.1 에러 바운더리

```typescript
// app/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">문제가 발생했습니다</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        다시 시도
      </button>
    </div>
  );
}
```

**규칙:**
- ✅ `error.tsx` 파일로 에러 처리
- ✅ 사용자 친화적 에러 메시지
- ✅ "다시 시도" 버튼 제공

### 6.2 로딩 상태

```typescript
// app/protected/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
    </div>
  );
}
```

**사용:**
- ✅ 페이지 로딩 중 표시
- ✅ Suspense 바운더리와 함께 사용

---

## 7. 데이터 페칭

### 7.1 서버 컴포넌트에서 데이터 조회

```typescript
// app/protected/profile/page.tsx
import { Suspense } from "react";

async function ProfileData() {
  const profile = await getProfile();
  return <div>{profile.full_name}</div>;
}

function ProfileSkeleton() {
  return <div className="bg-gray-200 h-8 w-32 rounded animate-pulse" />;
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileData />
    </Suspense>
  );
}
```

**패턴:**
- ✅ 서버 컴포넌트에서 직접 데이터 조회
- ✅ Suspense로 스트리밍 (Progressive Rendering)
- ✅ 스켈레톤 로딩 상태

### 7.2 revalidate 설정

```typescript
// app/protected/profile/page.tsx
export const revalidate = 60; // 60초마다 재검증 (ISR)

export default async function ProfilePage() {
  // ...
}
```

**옵션:**
- `revalidate = false` - 무기한 캐시
- `revalidate = 60` - 60초 캐시 (ISR)
- `revalidate = 0` - 항상 동적

---

## 8. 이미지 최적화

### 8.1 Next.js Image 사용

```typescript
// components/avatar.tsx
import Image from "next/image";

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={100}
      height={100}
      className="rounded-full"
      priority={false}
    />
  );
}
```

**규칙:**
- ✅ `width`, `height` 명시
- ✅ `alt` 텍스트 (SEO, 접근성)
- ✅ 중요 이미지만 `priority={true}`
- ✅ Supabase 이미지는 `unoptimized={true}` (CDN 이미 최적화)

---

## 9. 환경 변수

### 9.1 환경 변수 관리

```typescript
// lib/utils/env.ts
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  
  if (!value) {
    throw new Error(`환경 변수 ${key} 이 필요합니다`);
  }
  
  return value;
}

// 사용
const supabaseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
```

**규칙:**
- ✅ 클라이언트용: `NEXT_PUBLIC_` 접두사
- ✅ 서버용: 접두사 없음 (`.env.local`)
- ✅ 검증 함수로 존재 확인
- ✅ 절대 코드에 하드코딩 금지

---

## 10. 성능 최적화

### 10.1 코드 분할

```typescript
// components/heavy-modal.tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./heavy"), {
  loading: () => <p>로딩 중...</p>,
});

export function ModalButton() {
  return <HeavyComponent />;
}
```

**사용:**
- ✅ 무거운 컴포넌트는 `dynamic()` import
- ✅ 첫 페이지 로드 시간 단축

### 10.2 번들 분석

```bash
npm run build
npm install --save-dev @next/bundle-analyzer
```

**next.config.ts:**
```typescript
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer({
  // config
});
```

---

## 11. 배포

### 11.1 Vercel 배포

```bash
# 로컬에서 빌드 테스트
npm run build

# Vercel에 푸시 (자동 배포)
git push origin main
```

**Vercel 설정:**
- Environment Variables: `.env.local` 환경 변수 추가
- Serverless Functions: 자동 설정
- Preview Deployments: PR 자동 배포

### 11.2 빌드 최적화

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co", // Supabase Storage
      },
    ],
    unoptimized: true, // Supabase는 이미 최적화됨
  },
};

export default nextConfig;
```

---

## 12. 금지 사항 (DO NOT)

```typescript
// ❌ 금지: 클라이언트에서 server.ts 임포트
"use client";
import { createClient } from "@/lib/supabase/server"; // 🚫 금지!

// ✅ 올바른 방법: Server Action 호출
"use client";
import { getProfile } from "@/lib/actions/profile";

// ❌ 금지: 페이지에서 API 라우트 호출 후 render
// (Server Action 또는 서버 컴포넌트 사용)

// ❌ 금지: 클라이언트 컴포넌트에서 비동기 데이터 조회
// (useEffect + fetch 보다는 Server Component 사용)

// ❌ 금지: 라우트 동적 생성 (app 디렉토리에서)
// 대신 [id] 폴더 사용

// ❌ 금지: layout.tsx에서 클라이언트 상태 관리
// (context provider는 별도 컴포넌트로 감싸기)
```

---

## 참고 자료

- [Next.js 15 공식 문서](https://nextjs.org/docs)
- [App Router 마이그레이션](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [프로젝트 shrimp-rules](../shrimp-rules.md)

---

**문서 버전**: 1.0  
**최종 업데이트**: 2026-09-04  
**Next.js 버전**: 15.5.3
