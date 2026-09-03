# 프로젝트 요구사항 문서 (PRD)

## 1. 프로젝트 개요

### 1.1 프로젝트 목적

이 프로젝트는 **Next.js 15 + Supabase를 기반으로 한 모던 풀스택 웹 애플리케이션 스타터 키트**입니다.

**주요 목표:**
- 안전하고 확장 가능한 인증 시스템 제공
- 개발자 친화적인 구조 및 문서화
- 최신 웹 기술 (React 19, Next.js 15 App Router) 활용
- 보안 모범 사례 적용 (SSR, 쿠키 기반 세션)

### 1.2 타겟 사용자

- **초기 사용자**: 신규 회원가입 후 프로필 관리
- **기존 사용자**: 로그인 후 프로필 조회/수정
- **소셜 로그인 사용자**: Google OAuth를 통한 빠른 가입
- **개발자**: 이 스타터킷을 기반으로 자신의 앱 구축

### 1.3 성공 지표

| 지표 | 목표 | 현재 상태 |
|------|------|---------|
| 인증 시스템 완성도 | 100% | ✅ 완료 |
| 프로필 관리 기능 | 완전 구현 | ✅ 완료 |
| 보안 (RLS, 세션) | 적용 | ✅ 완료 |
| 문서화 | 개발자 가이드 제공 | 🔄 진행 중 |
| 배포 준비 | Vercel 호환 | ✅ 완료 |

---

## 2. 핵심 기능 목록

### 2.1 인증 시스템 (완료)

#### 이메일 & 비밀번호 인증
- ✅ 회원가입: `/auth/sign-up`
- ✅ 로그인: `/auth/login`
- ✅ 비밀번호 재설정: `/auth/forgot-password`, `/auth/update-password`
- ✅ 이메일 확인 (옵션)

**기술 상세:**
- Supabase Auth 네이티브 인증
- Zod 기반 폼 검증
- 사용자 친화적 에러 메시지
- 보안: 해시된 비밀번호 저장, HTTPS 전송

#### Google OAuth 통합
- ✅ Google 로그인 버튼 UI
- ✅ OAuth 2.0 콜백 처리 (`/auth/callback`)
- ✅ 자동 프로필 생성
- ✅ 기존 계정 연결 처리

**기술 상세:**
- Supabase OAuth 프로바이더
- HTTP-only 쿠키로 토큰 저장
- 보안: CSRF 방지, 토큰 검증

### 2.2 프로필 관리 (완료)

#### 프로필 생성
- ✅ 회원가입 시 자동 생성
- ✅ OAuth 로그인 시 자동 생성
- ✅ 데이터: 이메일, 이름, 생성일시

#### 프로필 조회
- ✅ `/protected/profile` 페이지에서 조회
- ✅ 프로필 정보 표시 (이메일, 이름)
- ✅ 가입 날짜 표시

#### 프로필 수정
- ✅ 이름 편집 기능
- ✅ Server Action 기반 업데이트
- ✅ 실시간 변경 반영

**권한:**
- 사용자는 자신의 프로필만 조회/수정 가능
- RLS (Row Level Security) 정책으로 보호

### 2.3 사용자 인터페이스 (완료)

#### 인증 페이지
- ✅ 로그인 폼 (이메일/비밀번호 + Google 버튼)
- ✅ 회원가입 폼 (이메일/비밀번호 + Google 버튼)
- ✅ 비밀번호 재설정 폼
- ✅ 에러/성공 메시지 표시

#### 보호된 페이지
- ✅ 홈 페이지 (`/protected`) - 사용자 정보 표시
- ✅ 프로필 페이지 (`/protected/profile`) - 프로필 수정
- ✅ 내비게이션 바 - 사용자명 표시, 로그아웃 버튼
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)

#### 테마 지원
- ✅ 다크 모드 / 라이트 모드 토글
- ✅ 시스템 테마 자동 감지
- ✅ 사용자 선호도 저장

### 2.4 세션 & 보안 (완료)

#### SSR 기반 세션 관리
- ✅ HTTP-only 쿠키로 토큰 저장
- ✅ 서버 컴포넌트에서 세션 확인
- ✅ 자동 토큰 갱신

#### 보호된 라우트
- ✅ 미인증 사용자 → 로그인 페이지로 리다이렉트
- ✅ 인증된 사용자만 `/protected` 접근 가능

#### 보안 정책
- ✅ RLS 활성화 (프로필 테이블)
- ✅ CORS 설정
- ✅ 환경 변수 관리 (.env.local)

---

## 3. 기술 스택

### 3.1 프론트엔드

| 라이브러리 | 버전 | 용도 |
|----------|------|------|
| React | 19 | UI 라이브러리 |
| Next.js | 15.5.3 | 프레임워크 (App Router) |
| TypeScript | 5.x | 타입 안정성 |
| Tailwind CSS | 3.4 | 스타일링 |
| shadcn/ui | Latest | UI 컴포넌트 |
| next-themes | Latest | 테마 관리 |
| Lucide React | Latest | 아이콘 |

### 3.2 백엔드 & 데이터베이스

| 서비스 | 용도 |
|--------|------|
| Supabase | 인증, PostgreSQL DB, RLS |
| PostgreSQL | 데이터 저장 |
| Supabase Auth | 사용자 인증 (OAuth, 이메일) |

### 3.3 개발 도구

| 도구 | 용도 |
|------|------|
| ESLint | 코드 품질 검사 |
| Prettier | 코드 포매팅 |
| TypeScript | 타입 검사 |
| Jest | 테스트 (향후) |

### 3.4 배포

| 플랫폼 | 용도 |
|--------|------|
| Vercel | Next.js 호스팅 (권장) |
| Docker | 컨테이너화 (대안) |

---

## 4. 사용자 스토리

### 4.1 신규 사용자 여정

```
1. 홈 페이지 방문 (/)
   ↓
2. "회원가입" 클릭
   ↓
3. 이메일/비밀번호 입력 또는 Google 로그인
   ↓
4. 프로필 자동 생성 (이메일 저장)
   ↓
5. /protected 페이지로 리다이렉트
   ↓
6. "프로필" 메뉴에서 이름 입력
   ↓
7. 프로필 완성
```

**성공 기준:**
- 가입 완료 후 프로필 페이지 접근 가능
- 이름 입력 후 저장 가능
- 로그아웃 후 로그인 가능

### 4.2 기존 사용자 여정

```
1. 홈 페이지 방문 (/)
   ↓
2. "로그인" 클릭
   ↓
3. 이메일/비밀번호 입력 또는 Google 로그인
   ↓
4. /protected 페이지로 자동 리다이렉트
   ↓
5. 사용자 정보 확인
   ↓
6. "프로필" 메뉴에서 정보 조회/수정
```

**성공 기준:**
- 올바른 자격증명으로 로그인 가능
- 프로필 정보 표시
- 이름 수정 가능

### 4.3 Google OAuth 사용자 여정

```
1. 회원가입 또는 로그인 페이지 방문
   ↓
2. "Google로 로그인" 버튼 클릭
   ↓
3. Google 인증 팝업 (또는 리다이렉트)
   ↓
4. Google 계정 선택
   ↓
5. 권한 승인
   ↓
6. 프로필 자동 생성 (/auth/callback)
   ↓
7. /protected 페이지로 리다이렉트
```

**성공 기준:**
- Google 로그인 성공
- 프로필 자동 생성
- 이후 일반 로그인처럼 작동

### 4.4 비밀번호 재설정 사용자 여정

```
1. 로그인 페이지에서 "비밀번호 잊으셨나요?" 클릭
   ↓
2. 이메일 입력
   ↓
3. 재설정 이메일 수신
   ↓
4. 이메일의 링크 클릭 (/auth/callback)
   ↓
5. 새 비밀번호 입력 및 저장
   ↓
6. 로그인 페이지로 리다이렉트
```

**성공 기준:**
- 이메일 전송 성공
- 링크 클릭 후 비밀번호 변경 페이지 표시
- 새 비밀번호로 로그인 가능

---

## 5. 데이터 모델

### 5.1 profiles 테이블

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,                    -- Supabase auth 사용자 ID
  email TEXT NOT NULL,                    -- 사용자 이메일
  full_name TEXT,                         -- 사용자 이름
  avatar_url TEXT,                        -- 아바타 이미지 URL
  created_at TIMESTAMP DEFAULT NOW(),     -- 생성 시간
  updated_at TIMESTAMP DEFAULT NOW()      -- 수정 시간
);

-- Row Level Security (RLS)
-- 사용자는 자신의 프로필만 조회/수정 가능
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "사용자는 자신의 프로필만 조회"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "사용자는 자신의 프로필만 수정"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### 5.2 API 스키마

#### GET /api/profile
**응답:**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "full_name": "홍길동",
  "avatar_url": null,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

#### PUT /api/profile
**요청:**
```json
{
  "full_name": "새로운 이름"
}
```

**응답:**
```json
{
  "success": true,
  "data": { "updated_at": "2024-01-02T00:00:00Z" }
}
```

---

## 6. 성공 기준 및 테스트 계획

### 6.1 인증 테스트

- [ ] 이메일/비밀번호 회원가입 성공
- [ ] 회원가입 후 프로필 자동 생성
- [ ] 이메일/비밀번호 로그인 성공
- [ ] 잘못된 자격증명 로그인 실패
- [ ] Google OAuth 회원가입 성공
- [ ] Google OAuth 로그인 성공
- [ ] 로그아웃 후 세션 삭제
- [ ] 미인증 사용자 로그인 페이지로 리다이렉트

### 6.2 프로필 관리 테스트

- [ ] 프로필 조회 (사용자 자신)
- [ ] 프로필 수정 (이름 변경)
- [ ] 수정 후 즉시 반영
- [ ] 다른 사용자 프로필 조회 불가능 (RLS 확인)
- [ ] 다른 사용자 프로필 수정 불가능 (RLS 확인)

### 6.3 UI/UX 테스트

- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] 다크 모드 / 라이트 모드 토글 작동
- [ ] 폼 검증 메시지 표시
- [ ] 에러 메시지 사용자 친화적
- [ ] 로딩 상태 표시

### 6.4 보안 테스트

- [ ] HTTPS 전송 확인
- [ ] 쿠키 HTTP-only 설정 확인
- [ ] RLS 정책 작동 확인
- [ ] 환경 변수 노출 없음
- [ ] CORS 설정 올바름

---

## 7. 배포 및 운영

### 7.1 환경 변수

```env
# .env.local (공개되지 않음)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 7.2 배포 플랫폼

**권장: Vercel**
- Next.js 최적화
- Supabase 통합
- 자동 환경 변수 관리
- Edge Functions 지원

**절차:**
1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 연결
3. 환경 변수 설정
4. 자동 배포

### 7.3 모니터링

- Vercel 대시보드에서 배포 상태 확인
- Supabase 대시보드에서 로그 확인
- 성능 메트릭 모니터링

---

## 8. 향후 확장 계획 (Phase 2+)

### 개선 예정 사항

- [ ] 프로필 이미지 업로드
- [ ] 사용자 소셜 링크 추가
- [ ] 팀/그룹 기능
- [ ] 실시간 알림 시스템
- [ ] 관리자 대시보드
- [ ] API 레이트 제한
- [ ] 사용자 활동 로그

---

## 9. 참고 자료

- [Supabase 문서](https://supabase.com/docs)
- [Next.js 15 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com)
- [프로젝트 CLAUDE.md](../CLAUDE.md)

---

**문서 버전:** 1.0  
**최종 업데이트:** 2026-09-04  
**상태:** ✅ MVP 완료
