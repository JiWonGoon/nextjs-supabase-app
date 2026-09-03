# 개발 로드맵 (ROADMAP)

## 프로젝트 개요

Next.js 15 + Supabase 풀스택 스타터 키트의 단계별 개발 계획입니다.

각 Phase는 명확한 목표, 기능, 체크리스트를 포함하며, 완료 후 다음 Phase로 진행합니다.

---

## Phase 1: MVP 완료 (현재 상태) ✅

**목표:** 핵심 인증 및 프로필 관리 기능 구현  
**예상 기간:** 완료  
**상태:** ✅ COMPLETE

### 1.1 인증 시스템 구현

**목표:** 안전한 사용자 인증 흐름 제공

#### 1.1.1 이메일 & 비밀번호 인증
- [x] 회원가입 페이지 UI (`/auth/sign-up`)
- [x] 로그인 페이지 UI (`/auth/login`)
- [x] Supabase Auth 통합
- [x] Zod 기반 폼 검증
- [x] 회원가입 성공 페이지
- [x] 에러 핸들링 및 메시지
- [x] 비밀번호 재설정 기능
  - [x] 비밀번호 잊음 페이지 (`/auth/forgot-password`)
  - [x] 비밀번호 변경 페이지 (`/auth/update-password`)
  - [x] 이메일 링크 확인 로직

**기술:**
- Supabase Auth (JWT)
- HTTP-only 쿠키 세션
- Server Actions로 보안 구현

#### 1.1.2 Google OAuth 통합
- [x] Google 로그인 버튼 UI
- [x] Supabase OAuth 설정
- [x] OAuth 콜백 처리 (`/auth/callback`)
- [x] 토큰 저장 및 갱신
- [x] 기존 사용자 자동 인식

**기술:**
- Supabase OAuth 프로바이더
- 콜백 URL 라우팅

#### 1.1.3 세션 관리
- [x] SSR 기반 쿠키 세션
- [x] 서버 컴포넌트 인증 확인
- [x] 자동 토큰 갱신
- [x] 로그아웃 기능

**기술:**
- `lib/supabase/server.ts` 구현
- RLS 정책 설정

### 1.2 프로필 관리 기능

**목표:** 사용자 프로필의 생성, 조회, 수정 기능 제공

#### 1.2.1 프로필 생성
- [x] 회원가입 후 프로필 자동 생성
- [x] OAuth 로그인 후 프로필 자동 생성
- [x] 중복 생성 방지 (유니크 제약)
- [x] 초기 데이터: 이메일, 생성일시

#### 1.2.2 프로필 조회
- [x] 프로필 페이지 UI (`/protected/profile`)
- [x] 현재 사용자 프로필 표시
- [x] 이메일 (읽기 전용)
- [x] 이름 (편집 가능)
- [x] 가입 날짜 표시

#### 1.2.3 프로필 수정
- [x] 프로필 수정 폼
- [x] 이름 편집 기능
- [x] Server Action 기반 업데이트
- [x] 실시간 변경 반영
- [x] 성공/실패 메시지

**기술:**
- Server Actions (`lib/actions/profile.ts`)
- Zod 검증
- Optimistic UI 업데이트

#### 1.2.4 권한 관리
- [x] RLS 정책: 사용자는 자신의 프로필만 조회/수정
- [x] 보안 테스트

### 1.3 사용자 인터페이스

**목표:** 사용자 친화적이고 반응형 UI 제공

#### 1.3.1 인증 페이지
- [x] 로그인 페이지 (`/auth/login`)
  - [x] 이메일/비밀번호 입력
  - [x] Google 로그인 버튼
  - [x] "회원가입" 링크
  - [x] "비밀번호 잊음" 링크
- [x] 회원가입 페이지 (`/auth/sign-up`)
  - [x] 이메일/비밀번호 입력
  - [x] Google 로그인 버튼
  - [x] 이용약관 동의
- [x] 비밀번호 재설정 페이지
- [x] 에러 페이지 (`/auth/error`)

#### 1.3.2 보호된 페이지
- [x] 보호된 홈 (`/protected`)
  - [x] 사용자 정보 표시
  - [x] 환영 메시지
  - [x] 프로필 링크
- [x] 프로필 페이지 (`/protected/profile`)
- [x] 공통 레이아웃 (내비게이션, 푸터)
  - [x] 사용자명 표시
  - [x] 로그아웃 버튼
  - [x] 테마 토글

#### 1.3.3 홈 페이지
- [x] 홈 페이지 (`/`)
- [x] 로그인/회원가입 버튼 (미인증)
- [x] 사용자 정보 (인증)
- [x] 환경 변수 체크
- [x] 튜토리얼 섹션

#### 1.3.4 테마 & 스타일
- [x] Tailwind CSS 기본 스타일
- [x] shadcn/ui 컴포넌트 적용
- [x] 다크 모드 / 라이트 모드 지원
- [x] 시스템 테마 감지
- [x] 반응형 디자인 (모바일/태블릿/데스크톱)

**컴포넌트 목록:**
- [x] Button, Input, Label
- [x] Card, Badge
- [x] Checkbox, DropdownMenu
- [x] AuthButton, LogoutButton
- [x] LoginForm, SignUpForm
- [x] ProfileForm
- [x] ThemeSwitcher
- [x] Hero, Deploy Button

### 1.4 보안 & 배포

#### 1.4.1 보안
- [x] RLS (Row Level Security) 정책
- [x] CORS 설정
- [x] 환경 변수 관리
- [x] 쿠키 기반 세션 (HTTP-only)
- [x] CSRF 방지

#### 1.4.2 코드 품질
- [x] TypeScript 타입 안정성
- [x] ESLint 설정
- [x] Prettier 포매팅
- [x] lint-staged 자동 검사

#### 1.4.3 배포 준비
- [x] Vercel 호환성 확인
- [x] 환경 변수 문서화
- [x] 배포 가이드 작성

---

## Phase 2: 기능 확장 (예상 기간: 2-3개월)

**목표:** 사용자 경험 향상 및 고급 기능 추가  
**상태:** ⏳ PLANNED

### 2.1 프로필 고급 기능

**우선순위:** 높음 (사용자 경험 개선)

#### 2.1.1 프로필 이미지 업로드
- [ ] 프로필 사진 업로드 UI
- [ ] Supabase Storage 통합
- [ ] 이미지 업로드 API
- [ ] 이미지 미리보기
- [ ] 이미지 교체/삭제 기능
- [ ] 이미지 크기 최적화 (썸네일 생성)
- [ ] CDN 캐싱 설정

**기술:**
- Supabase Storage
- Next.js Image 최적화
- 클라이언트 사이드 이미지 크기 조정

#### 2.1.2 프로필 소셜 링크
- [ ] 소셜 링크 추가 폼 (GitHub, LinkedIn, Twitter 등)
- [ ] 링크 유효성 검증
- [ ] 링크 표시 및 공유
- [ ] 프로필 공개 여부 설정

**데이터 스키마:**
```sql
ALTER TABLE profiles ADD COLUMN (
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  portfolio_url TEXT,
  is_public BOOLEAN DEFAULT false
);
```

#### 2.1.3 프로필 공개 페이지
- [ ] 공개 프로필 페이지 UI (`/profile/:userId`)
- [ ] 공개 데이터만 표시
- [ ] SEO 최적화
- [ ] 프로필 통계 (조회수 등)

### 2.2 팀 & 조직 기능

**우선순위:** 중간 (확장성)

#### 2.2.1 팀 생성 및 관리
- [ ] 팀 생성 기능
- [ ] 팀 멤버 초대
- [ ] 역할/권한 관리 (Owner, Admin, Member)
- [ ] 팀 설정 페이지

**데이터 스키마:**
```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE team_members (
  id UUID PRIMARY KEY,
  team_id UUID REFERENCES teams(id),
  user_id UUID REFERENCES profiles(id),
  role TEXT DEFAULT 'member', -- owner, admin, member
  joined_at TIMESTAMP DEFAULT NOW()
);
```

#### 2.2.2 팀 초대
- [ ] 이메일 기반 초대
- [ ] 초대 코드 생성
- [ ] 초대 상태 추적

#### 2.2.3 팀 대시보드
- [ ] 팀 페이지 (`/protected/teams`)
- [ ] 팀 멤버 목록
- [ ] 팀 설정

### 2.3 알림 시스템

**우선순위:** 중간 (사용자 참여도 향상)

#### 2.3.1 인앱 알림
- [ ] 알림 저장소 (DB)
- [ ] 실시간 알림 (Supabase Realtime)
- [ ] 알림 UI (종 아이콘)
- [ ] 알림 목록 페이지

**데이터 스키마:**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  message TEXT,
  type TEXT, -- invitation, message, update
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 2.3.2 이메일 알림 (선택)
- [ ] 이메일 템플릿
- [ ] 이메일 발송 서비스 연동 (SendGrid 등)
- [ ] 알림 설정 페이지

### 2.4 API & 통합

**우선순위:** 낮음 (개발자 기능)

#### 2.4.1 공개 API
- [ ] REST API 문서화
- [ ] API 인증 (API 키)
- [ ] Rate Limiting
- [ ] API 사용 통계

#### 2.4.2 Third-party 통합
- [ ] Slack 연동
- [ ] Discord 봇
- [ ] Zapier 연동

### 2.5 UI/UX 개선

**우선순위:** 높음 (사용자 경험)

#### 2.5.1 다국어 지원
- [ ] i18n 설정 (next-intl, i18next 등)
- [ ] 한국어, 영어 번역
- [ ] 언어 선택 UI

#### 2.5.2 접근성 (A11y)
- [ ] WCAG 2.1 AA 준수
- [ ] 스크린 리더 지원
- [ ] 키보드 네비게이션

#### 2.5.3 성능 최적화
- [ ] 이미지 최적화
- [ ] 코드 분할 (Code Splitting)
- [ ] 번들 크기 최소화
- [ ] 캐싱 전략 (ISR, Revalidation)

---

## Phase 3: 엔터프라이즈 기능 (장기 목표)

**예상 기간:** 3-6개월 이후  
**상태:** 📋 CONCEPT

### 3.1 관리자 기능

#### 3.1.1 관리자 대시보드
- [ ] 사용자 관리 (차단, 삭제 등)
- [ ] 팀 관리
- [ ] 시스템 통계 (가입자 수, 활동량 등)
- [ ] 감사 로그 (Audit Log)

**권한:**
- Super Admin만 접근 가능

#### 3.1.2 콘텐츠 모니터링
- [ ] 부적절 콘텐츠 신고
- [ ] 신고 대시보드
- [ ] 콘텐츠 삭제/복구

### 3.2 결제 & 구독 (SaaS 모델)

#### 3.2.1 가격 플랜
- [ ] Free, Pro, Enterprise 플랜
- [ ] 구독 결제 (Stripe 연동)
- [ ] 인보이스 관리

**데이터 스키마:**
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  plan TEXT, -- free, pro, enterprise
  status TEXT, -- active, canceled, expired
  starts_at TIMESTAMP,
  ends_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3.2.2 기능 제한
- [ ] 플랜별 기능 잠금
- [ ] 업그레이드 안내

### 3.3 고급 분석

#### 3.3.1 사용자 분석
- [ ] 사용 패턴 추적
- [ ] 대시보드 (차트, 그래프)
- [ ] 데이터 내보내기 (CSV, JSON)

#### 3.3.2 성능 모니터링
- [ ] 에러 로깅 (Sentry 등)
- [ ] 성능 메트릭 (Vercel Analytics)
- [ ] 서버 상태 페이지

### 3.4 AI 기반 기능 (혁신)

#### 3.4.1 AI 프로필 분석
- [ ] 프로필 자동 완성
- [ ] 프로필 추천

#### 3.4.2 자동화
- [ ] AI 챗봇 (지원)
- [ ] 자동 응답

---

## 마일스톤 타임라인

| 시기 | 마일스톤 | 상태 |
|------|---------|------|
| 2024 Q4 | Phase 1 MVP 완료 | ✅ COMPLETE |
| 2025 Q1 | Phase 2.1 프로필 고급 기능 | ⏳ PLANNED |
| 2025 Q2 | Phase 2.2 팀 기능 | ⏳ PLANNED |
| 2025 Q3 | Phase 2.3 알림 시스템 | ⏳ PLANNED |
| 2025 Q4 | Phase 3 엔터프라이즈 기능 | 📋 CONCEPT |

---

## 완료 기준

### Phase 1 체크리스트 ✅

**인증**
- [x] 이메일/비밀번호 인증 완료
- [x] Google OAuth 완료
- [x] 세션 관리 완료
- [x] 로그아웃 기능

**프로필**
- [x] 프로필 생성 자동화
- [x] 프로필 조회 기능
- [x] 프로필 수정 기능
- [x] RLS 보안

**UI/UX**
- [x] 모든 페이지 구현
- [x] 반응형 디자인
- [x] 다크/라이트 모드
- [x] 에러 처리

**배포**
- [x] Vercel 호환 확인
- [x] 환경 변수 설정
- [x] 보안 체크

**문서**
- [x] PRD 작성
- [x] ROADMAP 작성
- [x] 개발자 가이드 (CLAUDE.md)

### Phase 2 체크리스트 ⏳

**프로필 고급 기능**
- [ ] 이미지 업로드 완료
- [ ] 소셜 링크 추가
- [ ] 공개 프로필 페이지

**팀 기능**
- [ ] 팀 생성/관리
- [ ] 멤버 초대
- [ ] 권한 관리

**알림 시스템**
- [ ] 인앱 알림
- [ ] 실시간 알림
- [ ] 이메일 알림 (선택)

**테스트 완료**
- [ ] E2E 테스트
- [ ] 성능 테스트
- [ ] 보안 감사

---

## 개발 우선순위 기준

1. **사용자 영향도**: MVP 기능 > 고급 기능 > 엔터프라이즈 기능
2. **구현 복잡도**: 낮음 > 중간 > 높음
3. **비즈니스 가치**: 높음 > 중간 > 낮음
4. **기술적 채무**: 발생 순서대로

---

## 릴리스 전략

### Alpha Release (내부 테스트)
- Phase 1 기능 모두 구현
- 버그 수정 및 최적화

### Beta Release (제한된 사용자)
- Phase 2.1 프로필 고급 기능
- 피드백 수집

### GA (General Availability)
- 공개 릴리스
- 지속적인 개선

---

## 참고 사항

### 기술 채무 관리
- 정기적인 의존성 업데이트
- 코드 리팩토링 (분기별 1주일)
- 성능 최적화

### 커뮤니티 피드백
- GitHub Issues로 기능 요청 수집
- 사용자 설문조사 (분기별)
- 피드백 기반 우선순위 재조정

---

## 문서 업데이트

이 ROADMAP은 분기별로 업데이트됩니다.

- **최종 업데이트:** 2026-09-04
- **다음 검토:** 2026-12-04
- **담당자:** 프로젝트 팀

---

**상태:** Active  
**버전:** 1.0
