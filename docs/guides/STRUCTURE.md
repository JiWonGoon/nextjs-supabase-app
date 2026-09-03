# 📚 Guides 폴더 구조 및 최적화 요약

모든 개발 가이드가 통합되고 최적화된 상태입니다.

---

## 📋 파일 목록 및 설명

### 🎯 시작 문서

#### **`README.md`** ⭐ (START HERE)
- 모든 가이드의 인덱스 및 네비게이션
- 상황별 추천 문서
- 빠른 시작 가이드
- **읽는 시간**: 5분

---

### 📊 계획 및 요구사항

#### **`PRD.md`** (Product Requirements Document)
- 프로젝트 개요 및 목표
- 핵심 기능 목록
- 기술 스택 상세
- 사용자 스토리
- 데이터 모델 & API 스키마
- 배포 및 운영
- **대상**: 모든 팀원
- **읽는 시간**: 20분

#### **`ROADMAP.md`** (Development Roadmap)
- **Phase 1 (✅ 완료)**: MVP 기능
- **Phase 2 (⏳ 진행 예정)**: 기능 확장
- **Phase 3 (📋 계획)**: 엔터프라이즈 기능
- 마일스톤 & 체크리스트
- **대상**: 리더십, 기획자
- **읽는 시간**: 15분

---

### 🏗️ 기초 설정

#### **`project-structure.md`**
- 전체 폴더 구조
- 각 폴더의 역할
- 파일 명명 규칙
- App Router 구조
- 컴포넌트 조직
- **필수 읽음**: 신입 팀원
- **읽는 시간**: 10분

---

### 🚀 Framework 가이드

#### **`next-js-comprehensive.md`** ⭐ (핵심)
**Next.js 15.5.3 종합 개발 가이드**

**포함:**
- App Router 패턴
- Server Components vs Client
- 비동기 요청 API
- 페이지 & 레이아웃
- API 라우트
- Server Actions
- 에러 처리
- 데이터 페칭
- Suspense & Streaming
- 이미지 최적화
- 배포

**대상**: 모든 개발자  
**읽는 시간**: 30분  
**난이도**: 중급~고급

---

### 🎨 UI & 스타일

#### **`styling-guide.md`**
**Tailwind CSS v4 + shadcn/ui**

**포함:**
- Tailwind 기본 규칙
- 클래스 작성 순서
- shadcn/ui 사용법
- 다크 모드
- 반응형 디자인
- 애니메이션
- CSS Variables

**대상**: 프론트엔드 개발자  
**읽는 시간**: 15분

#### **`component-patterns.md`**
**React 컴포넌트 설계**

**포함:**
- SRP (단일 책임)
- 컴포지션 패턴
- Props 설계
- Custom Hooks
- HOC & Render Props
- 메모이제이션

**대상**: 프론트엔드 개발자  
**읽는 시간**: 20분

---

### 📝 코드 표준

#### **`coding-style.md`** ⭐ (핵심)
**코딩 스타일 및 표준**

**포함:**
- 명명 규칙 (camelCase, PascalCase, etc)
- 포맷팅 (들여쓰기, 따옴표, 세미콜론)
- JSDoc 주석
- 타입 정의
- 함수 구조
- 에러 처리
- React Hooks 규칙
- Import/Export 순서
- 자주하는 실수

**대상**: 모든 개발자  
**읽는 시간**: 25분  
**난이도**: 초급~중급

---

### 📋 폼 & 검증

#### **`forms-react-hook-form.md`**
**React Hook Form + Zod 폼 작성**

**포함:**
- React Hook Form 기본
- Zod 스키마 정의
- 폼 검증 패턴
- 에러 표시
- 비동기 검증
- 동적 필드
- Server Action 통합
- 폼 상태 관리

**대상**: 프론트엔드 개발자  
**읽는 시간**: 20분

---

### 🗄️ Backend & Database

#### **`supabase-comprehensive.md`**
**Supabase 종합 개발 가이드**

**포함:**
- 클라이언트 설정 (서버 vs 클라이언트)
- 인증 패턴 (회원가입, OAuth)
- CRUD 쿼리 작성
- RLS 정책
- Realtime 구독
- Storage & 파일 관리
- 마이그레이션 관리
- 성능 최적화

**대상**: 백엔드 & 풀스택 개발자  
**읽는 시간**: 30분  
**난이도**: 중급~고급

---

## 📊 통계

| 카테고리 | 파일 수 | 총 크기 | 읽는 시간 |
|---------|--------|--------|---------|
| 계획/요구사항 | 2 | 22KB | 35분 |
| 기초 설정 | 1 | 9KB | 10분 |
| Framework | 1 | 19KB | 30분 |
| UI/스타일 | 2 | 27KB | 35분 |
| 코드 표준 | 1 | 16KB | 25분 |
| 폼/검증 | 1 | 41KB | 20분 |
| DB/Backend | 1 | 18KB | 30분 |
| **총합** | **10** | **157KB** | **185분** |

---

## 🎯 팀원 별 추천 순서

### 🆕 신입 팀원 (첫 날)

```
1. README.md (5분)
2. project-structure.md (10분)
3. PRD.md (20분)
4. ROADMAP.md (15분)
────────────
총 50분
```

### 🆕 신입 팀원 (첫 주)

```
1. 첫 날 + 위 4개 (50분)

2. 담당 역할별 가이드:
   - 프론트엔드: styling-guide.md (15분) → component-patterns.md (20분)
   - 백엔드: supabase-comprehensive.md (30분)
   - 풀스택: next-js-comprehensive.md (30분)

3. 공통: coding-style.md (25분)
────────────
총 약 140~170분
```

### 👨‍💻 기존 개발자 (기능 구현)

```
1. README.md에서 해당 가이드 찾기 (2분)

2. 가이드 참고 (10~30분)
   예시:
   - 새 페이지: next-js-comprehensive.md
   - 새 컴포넌트: component-patterns.md + styling-guide.md
   - 새 폼: forms-react-hook-form.md
   - DB 작업: supabase-comprehensive.md

3. 필요시 coding-style.md 참고 (5분)
────────────
총 20~40분
```

---

## 🔄 중복 제거 및 최적화 내역

### ✅ 완료된 작업

| 항목 | 상태 | 설명 |
|------|------|------|
| nextjs-15.md | ❌ 삭제 | next-js-comprehensive.md로 통합 |
| INDEX.md | ❌ 삭제 | README.md로 대체 |
| 파일 이동 | ✅ 완료 | 모든 가이드를 guides 폴더로 통합 |
| 폴더 구조 | ✅ 정리 | 명확한 카테고리로 분류 |
| README | ✅ 생성 | 가이드 네비게이션 인덱스 |

### 📝 파일 구조 변화

**Before:**
```
docs/
├── PRD.md
├── ROADMAP.md
├── next-js.md
├── supabase.md
├── coding-style.md
├── INDEX.md
└── guides/
    ├── nextjs-15.md (중복)
    ├── styling-guide.md
    ├── component-patterns.md
    ├── project-structure.md
    └── forms-react-hook-form.md
```

**After:**
```
docs/
└── guides/
    ├── README.md (NEW)
    ├── STRUCTURE.md (THIS FILE)
    ├── PRD.md
    ├── ROADMAP.md
    ├── next-js-comprehensive.md
    ├── supabase-comprehensive.md
    ├── coding-style.md
    ├── styling-guide.md
    ├── component-patterns.md
    ├── project-structure.md
    └── forms-react-hook-form.md
```

---

## 🎓 학습 경로

### 🥚 입문자 경로 (4-5시간)

```
1. project-structure.md (10분)
   → 프로젝트 구조 이해

2. next-js-comprehensive.md (30분)
   → Next.js 기본 패턴 학습

3. coding-style.md (25분)
   → 코드 작성 표준 학습

4. styling-guide.md (15분)
   → 스타일링 방법 학습

5. component-patterns.md (20분)
   → 컴포넌트 설계 학습

6. forms-react-hook-form.md (20분)
   → 폼 작성 방법 학습
```

### 🐤 중급자 경로 (2-3시간)

```
1. README.md (5분) → 전체 구조 파악

2. 부족한 부분 선택:
   ├─ supabase-comprehensive.md (30분) - DB 심화
   ├─ next-js-comprehensive.md (30분) - API 심화
   └─ component-patterns.md (20분) - 설계 심화

3. 필요시 detail 참고
```

### 🦅 고급자 경로 (검색 기반)

```
1. README.md에서 필요한 섹션 찾기
2. 해당 파일 참고
```

---

## 💡 사용 팁

### 검색 방법

```bash
# VSCode에서 guides 폴더 내 검색
Ctrl+Shift+F → "guides/" 폴더 선택

# 예시 검색어:
- "async" → next-js-comprehensive.md (비동기 API)
- "RLS" → supabase-comprehensive.md (보안)
- "memo" → component-patterns.md (최적화)
- "error" → coding-style.md (에러 처리)
```

### 북마크 권장

```
자주 참고하는 페이지:
- README.md (네비게이션)
- coding-style.md (표준)
- next-js-comprehensive.md (Framework)
```

---

## 📞 문서 업데이트

### 변경 이력

| 날짜 | 변경사항 |
|------|---------|
| 2026-09-04 | 초기 통합 및 최적화 완료 |

### 다음 단계

- [ ] Supabase 가이드 단독 섹션 추가
- [ ] 비디오 튜토리얼 링크 추가
- [ ] 자주 묻는 질문 (FAQ) 추가
- [ ] 실습 프로젝트 템플릿 추가

---

**최종 상태**: ✅ 최적화 완료  
**총 문서**: 10개  
**총 크기**: 157KB  
**생성일**: 2026-09-04
