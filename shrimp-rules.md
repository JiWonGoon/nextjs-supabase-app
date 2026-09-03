# 프로젝트 개발 가이드라인 (shrimp-rules.md)

AI Agent를 위한 프로젝트 규칙 및 의사결정 가이드

---

## 1. 프로젝트 개요

### 프로젝트 정의
- **이름**: Next.js 15 + Supabase 풀스택 스타터 키트
- **목적**: 안전한 인증 시스템과 프로필 관리를 제공하는 모던 웹 애플리케이션 기반
- **기술 스택**: React 19, Next.js 15 (App Router), TypeScript, Supabase, Tailwind CSS, shadcn/ui

### 핵심 기능
- ✅ 이메일/비밀번호 인증
- ✅ Google OAuth 통합
- ✅ SSR 기반 쿠키 세션
- ✅ 프로필 관리 (CRUD)
- ✅ 다크/라이트 모드
- ✅ 보호된 라우트

---

## 2. 프로젝트 아키텍처

### 디렉토리 구조 규칙

```
nextjs-supabase-app/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 홈 페이지
│   ├── layout.tsx                # 루트 레이아웃 (ThemeProvider)
│   ├── globals.css               # 전역 스타일
│   ├── auth/                     # 인증 페이지
│   │   ├── login/page.tsx
│   │   ├── sign-up/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── update-password/page.tsx
│   │   ├── callback/route.ts     # OAuth 콜백
│   │   └── confirm/route.ts      # 이메일 확인
│   ├── protected/                # 인증 필수 페이지
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── profile/page.tsx
│   └── api/                      # API 라우트
│       ├── auth/callback/route.ts
│       └── profile/
│           ├── route.ts
│           └── create/route.ts
│
├── lib/                          # 재사용 라이브러리
│   ├── supabase/
│   │   ├── server.ts             # 서버/SSR용 클라이언트 (필수!)
│   │   ├── client.ts             # 클라이언트용 클라이언트
│   │   └── proxy.ts              # 토큰 갱신 프록시
│   ├── actions/
│   │   └── profile.ts            # Server Actions
│   ├── types/
│   │   └── profile.ts            # 타입 정의
│   └── utils.ts                  # 유틸 함수
│
├── components/                   # React 컴포넌트
│   ├── ui/                       # shadcn/ui 컴포넌트
│   ├── auth-button.tsx
│   ├── logout-button.tsx
│   ├── login-form.tsx
│   ├── sign-up-form.tsx
│   ├── forgot-password-form.tsx
│   ├── update-password-form.tsx
│   ├── profile-form.tsx
│   ├── theme-switcher.tsx
│   └── tutorial/                 # 튜토리얼 컴포넌트
│
├── docs/                         # 프로젝트 문서
│   ├── PRD.md
│   └── ROADMAP.md
│
├── .env.local                    # 환경 변수 (공개금지!)
├── CLAUDE.md                     # 개발자 가이드
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── components.json               # shadcn/ui 설정
```

### 파일 역할 정의

| 파일/폴더 | 용도 | 수정 권한 |
|----------|------|---------|
| app/ | 페이지, 라우팅, API | ✅ 자유 |
| lib/supabase/ | Supabase 클라이언트 | ⚠️ 신중 |
| lib/actions/ | Server Actions | ✅ 자유 |
| components/ | UI 컴포넌트 | ✅ 자유 |
| .env.local | 환경 변수 | 🚫 금지 |
| CLAUDE.md | 프로젝트 가이드 | ⚠️ 신중 |

---

## 3. 코드 스타일 및 표준

### 명명 규칙

- **변수/함수**: camelCase (`profileData`, `getProfile`)
- **컴포넌트**: PascalCase (`ProfileForm`, `AuthButton`)
- **상수**: UPPER_SNAKE_CASE (`API_URL`, `MAX_RETRY_COUNT`)
- **파일명**: 
  - 컴포넌트: kebab-case (`profile-form.tsx`)
  - 유틸/액션: kebab-case 또는 snake_case (`profile.ts`)
  - 페이지: 폴더 구조로 자동 라우팅

### 코드 포맷팅

- **들여쓰기**: 2칸 스페이스 (Prettier)
- **따옴표**: 더블 쿼트 (`"string"`)
- **세미콜론**: 필수
- **줄 길이**: 100자 (Prettier 설정)
- **Trailing comma**: ES5 스타일

**실행 명령어:**
```bash
npm run lint:fix    # ESLint 자동 수정
npm run format      # Prettier 포매팅
npm run type-check  # TypeScript 타입 검사
```

### JSDoc 주석

```typescript
// ✅ DO: 간단하고 명확한 주석
/**
 * 사용자 프로필을 데이터베이스에서 조회합니다.
 */
async function getProfile(userId: string): Promise<Profile> {
  // ...
}

// ❌ DON'T: 불필요하게 긴 주석
/**
 * 이 함수는 프로필을 조회하는 함수입니다.
 * 데이터베이스에서 사용자 ID를 기반으로 프로필 정보를 가져옵니다.
 * @param userId - 사용자의 고유 식별자
 * @returns 조회된 프로필 정보
 */
```

### 로깅

- ✅ **적절한 로깅 라이브러리 사용** (winston, pino 등)
- 🚫 **`console.log` 금지** (배포 시 문제 가능성)

```typescript
// ❌ 금지
console.log("프로필 조회:", profile);

// ✅ 권장
logger.info("프로필 조회", { userId, profile });
```

---

## 4. Supabase 클라이언트 사용 규칙

### 규칙 1: 서버 vs 클라이언트 구분

| 환경 | 사용할 파일 | 예시 |
|------|-----------|------|
| 서버 컴포넌트 | `lib/supabase/server.ts` | ✅ `getProfile()` Server Action |
| Server Action | `lib/supabase/server.ts` | ✅ `updateProfile()` |
| API 라우트 | `lib/supabase/server.ts` | ✅ `GET /api/profile` |
| 클라이언트 컴포넌트 | `lib/supabase/client.ts` | ✅ 폼 제출 시 클라이언트 로직 |

### 규칙 2: 클라이언트 생성 패턴

```typescript
// ✅ DO: 서버 환경 (매 호출마다 새 인스턴스)
import { createClient } from "@/lib/supabase/server";
export async function getProfile(userId: string) {
  const supabase = createClient();  // 항상 새로 생성
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId);
}

// ❌ DON'T: 전역 변수에 저장
const supabase = createClient();  // 🚫 금지!

// ❌ DON'T: 클라이언트 환경에서 server.ts 사용
"use client";
import { createClient } from "@/lib/supabase/server";  // 🚫 금지!
```

### 규칙 3: 인증 체크 (항상 필수!)

```typescript
// ✅ DO: Server Action에서 인증 확인
export async function updateProfile(input: UpdateProfileInput) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("사용자 인증이 필요합니다");
  }
  
  // 이후 데이터 수정...
}

// ✅ DO: API 라우트에서 인증 확인
export async function PUT(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
```

---

## 5. 인증 및 보안 규칙

### 세션 관리

- **저장 위치**: HTTP-only 쿠키 (자동 처리)
- **토큰 갱신**: 자동 (server.ts에서 처리)
- **로그아웃**: `supabase.auth.signOut()`

### RLS (Row Level Security) 정책

```sql
-- profiles 테이블
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 프로필만 조회 가능
CREATE POLICY "사용자는 자신의 프로필만 조회"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- 사용자는 자신의 프로필만 수정 가능
CREATE POLICY "사용자는 자신의 프로필만 수정"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

**AI 의사결정**: 새 테이블 추가 시 항상 RLS 정책 추가 필수!

### 환경 변수 관리

```env
# .env.local (공개금지!)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key

# 필요 시만 추가
SUPABASE_SERVICE_ROLE_KEY=your-secret-key  # 공개금지!
```

**규칙:**
- NEXT_PUBLIC_* 접두사: 클라이언트에 노출 가능
- 그 외: 서버에만 저장 (절대 공개금지!)
- `.env.local` 파일은 `.gitignore`에 포함되어야 함

---

## 6. API 엔드포인트 설계

### RESTful 원칙

| 메서드 | 엔드포인트 | 용도 |
|--------|----------|------|
| GET | `/api/profile` | 현재 사용자 프로필 조회 |
| POST | `/api/profile/create` | 프로필 생성 (회원가입 후) |
| PUT | `/api/profile` | 프로필 수정 |
| DELETE | `/api/profile` | 프로필 삭제 (구현 예정) |

### 에러 처리

```typescript
// ✅ DO: 명확한 에러 응답
export async function GET(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
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
```

---

## 7. 폼 및 유효성 검증

### Zod 스키마

```typescript
// ✅ DO: 명확한 Zod 스키마 정의
import { z } from "zod";

const UpdateProfileSchema = z.object({
  full_name: z
    .string()
    .min(1, "이름은 필수입니다")
    .max(100, "이름은 100자 이내여야 합니다"),
  email: z.string().email("유효한 이메일을 입력하세요").optional(),
});

// Server Action에서 검증
export async function updateProfile(input: UpdateProfileInput) {
  const validated = UpdateProfileSchema.parse(input);
  // ...
}
```

### 폼 컴포넌트 패턴

```typescript
// ✅ DO: React Hook Form + Zod
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/lib/actions/profile";

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(UpdateProfileSchema),
  });

  async function onSubmit(data: UpdateProfileInput) {
    try {
      await updateProfile(data);
      // 성공 처리
    } catch (error) {
      // 에러 처리
    }
  }

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}
```

---

## 8. 워크플로우 및 데이터 흐름

### 인증 흐름

```
사용자 입력 (폼)
    ↓
클라이언트 검증 (React Hook Form)
    ↓
Server Action 호출
    ↓
서버 검증 (Zod)
    ↓
Supabase Auth 인증
    ↓
프로필 생성/업데이트
    ↓
응답 반환 (클라이언트로)
    ↓
UI 업데이트
```

### 프로필 조회 흐름

```
보호된 페이지 로드
    ↓
Server Action: getProfile() 호출
    ↓
Supabase Auth: getUser() 확인
    ↓
RLS 정책 확인 (자신의 프로필만)
    ↓
데이터 조회 및 반환
    ↓
페이지 렌더링
```

---

## 9. 핵심 파일 상호작용

### 프로필 관리 워크플로우

| 파일 | 역할 | 상호작용 |
|------|------|--------|
| `lib/actions/profile.ts` | Server Action 정의 | API 엔드포인트와 양방향 |
| `lib/types/profile.ts` | 타입 정의 | 모든 프로필 관련 파일에서 import |
| `app/api/profile/route.ts` | API 엔드포인트 | Server Action과 동일한 로직 |
| `components/profile-form.tsx` | UI 폼 | Server Action 호출 |
| `app/protected/profile/page.tsx` | 프로필 페이지 | Server Action으로 데이터 조회 |

**규칙**: 프로필 타입 수정 시 `lib/types/profile.ts` 먼저 수정, 이후 관련 파일 일괄 수정 필요

### OAuth 콜백 워크플로우

| 파일 | 역할 |
|------|------|
| `app/auth/callback/route.ts` | OAuth 리다이렉트 처리 |
| `app/api/auth/callback/route.ts` | 대체 콜백 (백업) |
| `lib/actions/profile.ts` | 프로필 자동 생성 |

**주의**: 두 콜백 파일 로직을 동기화 유지해야 함

---

## 10. AI 의사결정 기준

### 신규 기능 추가 시 의사결정 트리

```
새 기능 요청 받음
    ├─ 데이터베이스 변경 필요?
    │   ├─ YES → Supabase 마이그레이션 생성 후 적용
    │   │         └─ 관련 타입 업데이트 (lib/types/)
    │   └─ NO → 계속
    │
    ├─ 인증 필요?
    │   ├─ YES → Server Action 또는 API 라우트에서 getUser() 체크
    │   │         └─ RLS 정책 확인/추가
    │   └─ NO → 계속
    │
    ├─ UI 필요?
    │   ├─ YES → 클라이언트 컴포넌트 생성 (use client)
    │   │         └─ 폼 검증: Zod + React Hook Form
    │   └─ NO → 완료
    │
    └─ 테스트
        └─ 보안 검사 (환경 변수 노출 확인, RLS 정책 확인)
```

### 우선순위 결정

1. **보안** (최고)
   - 인증/권한 체크
   - RLS 정책
   - 환경 변수 보호

2. **기능 완성도**
   - 모든 CRUD 작업
   - 에러 처리
   - 유효성 검증

3. **사용자 경험**
   - UI/UX 개선
   - 로딩 상태
   - 에러 메시지

4. **성능 최적화** (낮음)
   - 캐싱
   - 이미지 최적화

---

## 11. 금지 사항 (DO NOT)

### 🚫 절대 금지

```typescript
// 1. console.log 사용 금지
console.log("프로필:", profile);  // ❌ 금지

// 2. 클라이언트에서 server.ts 사용 금지
"use client";
import { createClient } from "@/lib/supabase/server";  // ❌ 금지

// 3. 환경 변수 .env.local 수정/커밋 금지
NEXT_PUBLIC_SUPABASE_URL=...  // ❌ .gitignore 확인 후 커밋 금지

// 4. 인증 체크 건너뛰기 금지
export async function updateProfile(data) {
  // ❌ getUser() 확인 없이 진행
  await supabase.from("profiles").update(data);
}

// 5. 전역 Supabase 클라이언트 금지
const supabase = createClient();  // ❌ 금지 (Fluid Compute 호환성)

// 6. RLS 정책 우회 시도 금지
const supabase = createClient();
await supabase.auth.admin.deleteUser(userId);  // ❌ admin 메서드 금지

// 7. 하드코딩된 값 금지
const API_URL = "https://specific-url.com";  // ❌ 환경 변수 사용
const MAX_RETRIES = 3;  // ✅ 상수는 OK

// 8. 타입 무시 금지
const profile: any = data;  // ❌ any 금지, 명시적 타입 사용

// 9. 오류 무시 금지
try {
  await supabase.from("profiles").select("*");
} catch (error) {
  // ❌ 무시하고 계속
}

// 10. 패턴 불일치 금지
// Server Action 내에서 직접 API 호출 대신 로직 재사용
export async function getProfileApi() {
  return getProfile();  // ✅ 코드 재사용
}
```

### ⚠️ 주의사항

1. **마이그레이션 관리**
   - 새 테이블 추가 시 마이그레이션 파일 필수
   - RLS 정책 마이그레이션에 포함

2. **타입 안정성**
   - 모든 DB 쿼리 결과에 명시적 타입 지정
   - 옵셔널 필드는 `?` 명시

3. **에러 처리**
   - 사용자 친화적 에러 메시지 제공
   - 내부 에러 노출 금지

---

## 12. 참고 자료 및 외부 링크

- **Supabase 문서**: https://supabase.com/docs
- **Next.js 15 공식 문서**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **프로젝트 CLAUDE.md**: CLAUDE.md
- **PRD**: docs/PRD.md
- **ROADMAP**: docs/ROADMAP.md

---

**문서 버전**: 1.0  
**최종 업데이트**: 2026-09-04  
**AI Agent 최적화됨**: ✅
