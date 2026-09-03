# 📚 프로젝트 문서 가이드

Next.js 15 + Supabase 풀스택 애플리케이션의 완전한 문서 체계입니다.

**총 11개 문서, 165KB | 완독 시간: 약 3시간 | 신입 온보딩: 약 1시간**

---

## 🚀 빠른 시작 (5분)

### 1️⃣ 상황별 추천 문서

| 상황 | 추천 문서 | 시간 |
|------|---------|------|
| **프로젝트 이해** | [`PRD.md`](./PRD.md) | 20분 |
| **개발 계획** | [`ROADMAP.md`](./ROADMAP.md) | 15분 |
| **프로젝트 구조** | [`guides/project-structure.md`](./guides/project-structure.md) | 10분 |
| **Next.js 시작** | [`guides/next-js-comprehensive.md`](./guides/next-js-comprehensive.md) | 30분 |
| **코드 작성** | [`guides/coding-style.md`](./guides/coding-style.md) | 25분 |
| **UI 개발** | [`guides/styling-guide.md`](./guides/styling-guide.md) | 15분 |
| **Database** | [`guides/supabase-comprehensive.md`](./guides/supabase-comprehensive.md) | 30분 |
| **폼 구현** | [`guides/forms-react-hook-form.md`](./guides/forms-react-hook-form.md) | 20분 |

### 2️⃣ 신입 팀원 온보딩 (1시간)

```
1. PRD.md (20분) → 프로젝트 이해
2. guides/project-structure.md (10분) → 구조 파악
3. guides/coding-style.md (25분) → 코드 표준
4. 역할별 가이드 선택 (5분) → 시작
```

---

## 📋 메인 문서 (/docs)

### **1. [`PRD.md`](./PRD.md)** 📋 프로젝트 요구사항 문서

**대상**: 모든 팀원  
**읽는 시간**: 20분  
**난이도**: 입문

**포함:**
- ✅ 프로젝트 개요 및 목표
- ✅ 핵심 기능 (인증, 프로필, 테마)
- ✅ 기술 스택 상세
- ✅ 사용자 스토리 5개
- ✅ 데이터 모델 & API 스키마
- ✅ 배포 및 운영 가이드

**언제 읽나?**
- 프로젝트를 처음 시작할 때
- 새로운 기능을 구현하기 전에

---

### **2. [`ROADMAP.md`](./ROADMAP.md)** 🗓️ 개발 로드맵

**대상**: 리더십, 기획자  
**읽는 시간**: 15분  
**난이도**: 입문

**포함:**
- ✅ **Phase 1 (✅ 완료)**: MVP 기능 (인증, 프로필)
- ✅ **Phase 2 (⏳ 예정)**: 프로필 고급 기능, 팀, 알림
- ✅ **Phase 3 (📋 계획)**: 엔터프라이즈 기능
- ✅ 마일스톤 타임라인
- ✅ 완료 기준 & 체크리스트

**언제 읽나?**
- 개발 계획을 이해하고 싶을 때
- 다음 Phase 기능을 계획할 때

---

## 📚 상세 가이드 (/docs/guides)

### 🏗️ 기초 가이드

#### **3. [`guides/project-structure.md`](./guides/project-structure.md)** 🏗️ 프로젝트 구조

**대상**: 모든 개발자  
**읽는 시간**: 10분  
**난이도**: 입문

**포함:**
- ✅ 전체 폴더 구조
- ✅ 각 폴더의 역할 정의
- ✅ 파일 명명 규칙
- ✅ App Router 구조

**언제 읽나?**
- 처음 프로젝트에 참여할 때
- 새 폴더/파일을 생성할 때

---

### 🚀 Framework & Backend

#### **4. [`guides/next-js-comprehensive.md`](./guides/next-js-comprehensive.md)** ⭐ Next.js 15.5.3 종합 가이드

**대상**: 모든 개발자  
**읽는 시간**: 30분  
**난이도**: 중급~고급

**포함:**
- ✅ App Router 구조 및 라우팅
- ✅ Server Components vs Client
- ✅ 비동기 요청 API (params, searchParams, cookies)
- ✅ 페이지, 레이아웃, API 라우트
- ✅ Server Actions 패턴
- ✅ 에러 처리 & Suspense & Streaming
- ✅ 데이터 페칭 & ISR
- ✅ 배포 가이드

**언제 읽나?**
- 새 페이지/컴포넌트 작성 전
- API 엔드포인트 작성 전
- 배포하기 전

---

#### **5. [`guides/supabase-comprehensive.md`](./guides/supabase-comprehensive.md)** 📌 Supabase 종합 가이드

**대상**: 백엔드 & 풀스택 개발자  
**읽는 시간**: 30분  
**난이도**: 중급~고급

**포함:**
- ✅ 클라이언트 설정 (서버 vs 클라이언트)
- ✅ 인증 패턴 (회원가입, OAuth)
- ✅ CRUD 쿼리 작성
- ✅ RLS (Row Level Security) 정책
- ✅ Realtime 구독
- ✅ Storage & 파일 관리
- ✅ 마이그레이션 관리
- ✅ 성능 최적화

**언제 읽나?**
- 데이터베이스 작업 시
- 새 테이블 생성 시
- 인증 구현 시

---

### 🎨 UI & 스타일

#### **6. [`guides/styling-guide.md`](./guides/styling-guide.md)** 🎨 Tailwind CSS v4 + shadcn/ui

**대상**: 프론트엔드 개발자  
**읽는 시간**: 15분  
**난이도**: 입문~중급

**포함:**
- ✅ Tailwind CSS v4 규칙
- ✅ 클래스 작성 순서
- ✅ shadcn/ui 컴포넌트 사용법
- ✅ 다크 모드 설정
- ✅ 반응형 디자인
- ✅ 애니메이션

**언제 읽나?**
- UI 컴포넌트 스타일링 시
- Tailwind 클래스 작성 시

---

#### **7. [`guides/component-patterns.md`](./guides/component-patterns.md)** 🧩 React 컴포넌트 패턴

**대상**: 프론트엔드 개발자  
**읽는 시간**: 20분  
**난이도**: 중급

**포함:**
- ✅ SRP (단일 책임 원칙)
- ✅ 컴포지션 패턴
- ✅ Props 설계
- ✅ Custom Hooks
- ✅ HOC & Render Props
- ✅ 메모이제이션 최적화

**언제 읽나?**
- 새 컴포넌트 설계 시
- 컴포넌트 리팩토링 시

---

### 📝 코드 표준

#### **8. [`guides/coding-style.md`](./guides/coding-style.md)** ⭐ 코딩 스타일 및 표준

**대상**: 모든 개발자  
**읽는 시간**: 25분  
**난이도**: 입문~중급

**포함:**
- ✅ 명명 규칙 (camelCase, PascalCase, UPPER_CASE, kebab-case)
- ✅ 포맷팅 (들여쓰기, 따옴표, 세미콜론)
- ✅ JSDoc 주석
- ✅ 타입 정의
- ✅ 함수 & 컴포넌트 구조
- ✅ 에러 처리
- ✅ React Hooks 규칙
- ✅ Import/Export 순서
- ✅ 자주하는 실수

**언제 읽나?**
- 코드 작성 시 (매번)
- PR 리뷰 시

---

### 📋 폼 & 검증

#### **9. [`guides/forms-react-hook-form.md`](./guides/forms-react-hook-form.md)** 📋 React Hook Form + Zod

**대상**: 프론트엔드 개발자  
**읽는 시간**: 20분  
**난이도**: 중급

**포함:**
- ✅ React Hook Form 기본
- ✅ Zod 스키마 정의
- ✅ 폼 검증 패턴
- ✅ 에러 표시
- ✅ 비동기 검증
- ✅ 동적 필드 관리
- ✅ Server Action 통합

**언제 읽나?**
- 새 폼 구현 시
- 폼 검증 추가 시

---

### 📊 참고 문서

#### **10. [`guides/STRUCTURE.md`](./guides/STRUCTURE.md)** 📊 폴더 구조 설명서

전체 문서 체계, 통계, 학습 경로 설명.

---

## 🎯 문서 선택 가이드

### 상황별 최고의 가이드

```
❓ "프로젝트가 뭐하는 건가요?"
→ PRD.md

❓ "다음에 뭘 만드나요?"
→ ROADMAP.md

❓ "폴더는 어떻게 정리되어 있나요?"
→ guides/project-structure.md

❓ "페이지를 어떻게 만드나요?"
→ guides/next-js-comprehensive.md

❓ "데이터베이스에서 데이터를 어떻게 가져오나요?"
→ guides/supabase-comprehensive.md

❓ "버튼을 어떻게 스타일링하나요?"
→ guides/styling-guide.md

❓ "컴포넌트는 어떻게 설계하나요?"
→ guides/component-patterns.md

❓ "변수명은 어떻게 지으면 되나요?"
→ guides/coding-style.md

❓ "폼을 어떻게 만드나요?"
→ guides/forms-react-hook-form.md
```

---

## 📊 전체 통계

| 카테고리 | 파일 수 | 크기 | 시간 |
|---------|--------|------|------|
| 메인 문서 (/docs) | 3 | 27KB | 55분 |
| 상세 가이드 (/docs/guides) | 8 | 138KB | 195분 |
| **총합** | **11** | **165KB** | **250분** |

**신입 온보딩**: 약 60분  
**개발 시작**: 필요한 가이드만 선택

---

## 🔗 문서 간 관계도

```
PRD.md (프로젝트 이해)
  ├─ ROADMAP.md (개발 계획)
  └─ guides/project-structure.md (구조 파악)
       └─ guides/next-js-comprehensive.md (개발 시작)
            ├─ guides/supabase-comprehensive.md (DB)
            ├─ guides/styling-guide.md (UI)
            ├─ guides/component-patterns.md (설계)
            ├─ guides/coding-style.md (표준) ⭐
            └─ guides/forms-react-hook-form.md (폼)

guides/STRUCTURE.md (전체 구조 설명)
```

---

## ✅ 체크리스트

### 신입 팀원 온보딩

- [ ] PRD.md 읽기 (20분)
- [ ] guides/project-structure.md 읽기 (10분)
- [ ] guides/coding-style.md 읽기 (25분)
- [ ] 역할별 가이드 선택:
  - [ ] 프론트엔드: guides/styling-guide.md + component-patterns.md
  - [ ] 백엔드: guides/supabase-comprehensive.md
  - [ ] 풀스택: guides/next-js-comprehensive.md
- [ ] 첫 PR 작성 (using coding-style.md)

### 개발 시작 체크

- [ ] 해당 가이드 선택 (README.md 참고)
- [ ] 가이드 읽기 (10~30분)
- [ ] coding-style.md 참고하며 코드 작성
- [ ] PR 생성 전 가이드 재확인

---

## 📞 문서 위치

### 로컬 경로

```
/docs/                           # 메인 문서
├── README.md                    # 현재 문서 (네비게이션)
├── PRD.md                       # 프로젝트 요구사항
├── ROADMAP.md                   # 개발 로드맵
└── guides/                      # 상세 가이드
    ├── STRUCTURE.md             # 구조 설명서
    ├── project-structure.md     # 프로젝트 구조
    ├── next-js-comprehensive.md # Next.js 가이드
    ├── supabase-comprehensive.md# Supabase 가이드
    ├── coding-style.md          # 코딩 표준
    ├── styling-guide.md         # Tailwind 가이드
    ├── component-patterns.md    # 컴포넌트 설계
    └── forms-react-hook-form.md # 폼 가이드
```

---

## 🚀 다음 단계

1. **팀원 공유**: `PRD.md` 링크 공유
2. **신입 온보딩**: 위의 체크리스트 따라가기
3. **개발 시작**: 필요한 가이드 선택해서 개발

---

**마지막 업데이트**: 2026-09-04  
**상태**: ✅ 완성  
**버전**: 1.0
