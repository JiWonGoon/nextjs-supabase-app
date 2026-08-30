# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 15 + Supabase 스타터 키트입니다. 사용자 인증, 프로필 관리, 다크 모드를 지원하는 풀스택 앱입니다.

## 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **인증**: Supabase Auth (SSR 기반 쿠키 세션)
- **데이터베이스**: Supabase PostgreSQL
- **UI 라이브러리**: shadcn/ui + Tailwind CSS + Radix UI
- **테마**: next-themes (라이트/다크 모드)
- **언어**: TypeScript

## 주요 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 앱 시작
npm start

# ESLint 검사
npm run lint
```

## 프로젝트 구조

### 핵심 디렉토리

- **`app/`** - Next.js App Router 기반 페이지 및 API 라우트
  - `auth/` - 인증 관련 페이지 (로그인, 회원가입, 비밀번호 관리)
  - `protected/` - 로그인 필수 페이지 (레이아웃으로 미들웨어 보호)
  - `api/` - 백엔드 API 엔드포인트

- **`lib/`** - 재사용 가능한 로직 및 유틸리티
  - `supabase/` - Supabase 클라이언트 인스턴스
    - `client.ts` - 브라우저 환경용 클라이언트
    - `server.ts` - 서버/서버 컴포넌트용 클라이언트 (쿠키 기반 세션)
    - `proxy.ts` - 프록시를 통한 토큰 갱신
  - `actions/` - Server Action 함수들 (프로필 CRUD)
  - `types/` - TypeScript 타입 정의
  - `utils.ts` - 유틸리티 함수

- **`components/`** - React 컴포넌트
  - `ui/` - shadcn/ui 컴포넌트들
  - `auth-button.tsx`, `logout-button.tsx` - 인증 UI
  - `login-form.tsx`, `sign-up-form.tsx` - 폼 컴포넌트
  - `profile-form.tsx` - 프로필 수정 폼

## 아키텍처 핵심

### 인증 흐름

1. **서버 컴포넌트 중심**: `createClient()` (from `lib/supabase/server.ts`)를 사용해 서버에서 사용자 세션 확인
2. **쿠키 기반**: Supabase SSR 패키지로 HTTP-only 쿠키에 세션 저장
3. **클라이언트 인증**: 브라우저 액션 필요 시 `lib/supabase/client.ts` 사용

### Server Action 패턴

프로필 관리는 Server Action으로 구현됨 (`lib/actions/profile.ts`):

- `"use server"` 지시문으로 서버에서만 실행
- 항상 인증 체크 수행
- 데이터베이스 직접 접근 (보안: RLS 정책으로 보호)

### 라우트 보호

- `/protected` 레이아웃에서 미들웨어 없이 서버 컴포넌트로 인증 체크
- 미인증 사용자 접근 시 `createClient().auth.getUser()`에서 null 반환 처리

## Supabase 환경 설정

### 필수 환경 변수 (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 데이터베이스 스키마

**profiles 테이블**

- `id` (UUID, 기본키) - 사용자 ID
- `email` (text)
- `full_name` (text, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## 개발 주의사항

### SSR 클라이언트 사용 시

`lib/supabase/server.ts`의 `createClient()`는 매 함수 호출마다 새 인스턴스 생성:

- Fluid Compute 사용 시 필수
- 전역 변수에 저장 금지

### 에러 처리

Server Action에서 인증 오류:

```typescript
const {
  data: { user },
} = await supabase.auth.getUser();
if (!user) {
  throw new Error("사용자 인증이 필요합니다");
}
```

### 타입 안정성

- 모든 Server Action은 명시적 타입 정의 필요 (`lib/types/profile.ts` 참고)
- `UpdateProfileInput`, `Profile` 등 인터페이스 사용

## 배포

- **Vercel 권장**: Supabase 통합으로 환경 변수 자동 설정
- **로컬 개발**: `supabase start` (Supabase CLI) 또는 클라우드 프로젝트 사용

## 참고 사항

- Next.js 15부터 일부 API 변경 가능: `node_modules/next/dist/docs/` 확인
- shadcn/ui 컴포넌트 추가: `npx shadcn-ui@latest add [component]`
- Tailwind CSS 커스터마이징: `tailwind.config.js` 참고
