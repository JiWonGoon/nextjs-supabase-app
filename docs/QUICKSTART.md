# 빠른 시작 가이드 (Quick Start)

이 가이드는 5분 안에 Next.js + Supabase 스타터 키트를 로컬에서 실행할 수 있도록 안내합니다.

---

## 전제 조건

- **Node.js** 18.17 이상
- **npm**, **yarn**, 또는 **pnpm**
- **Supabase 계정** (https://supabase.com)

---

## Step 1: 환경 설정 (1분)

### 1.1 Supabase 프로젝트 생성

1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
2. "New Project" 클릭
3. 프로젝트 이름 입력 및 생성

### 1.2 환경 변수 설정

1. 프로젝트의 **Settings > API** 메뉴 이동
2. 다음 정보 복사:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon / public key` → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

3. 프로젝트 루트에 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 1.3 의존성 설치

```bash
npm install
```

---

## Step 2: 로컬 개발 서버 실행 (1분)

```bash
npm run dev
```

**예상 결과:**

```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

브라우저에서 `http://localhost:3000` 열기

---

## Step 3: 기능 테스트 (3분)

### 3.1 회원가입 테스트

1. 홈페이지의 "Sign up" 클릭
2. 임의의 이메일/비밀번호 입력
3. 회원가입 버튼 클릭

**체크리스트:**

- [ ] 회원가입 성공 메시지 표시
- [ ] `/protected` 페이지로 자동 리다이렉트
- [ ] 사용자 정보 표시됨

### 3.2 로그아웃 및 로그인

1. 우측 상단 "Logout" 버튼 클릭
2. 로그인 페이지에서 위에서 생성한 계정으로 로그인
3. `/protected` 페이지 접근 확인

**체크리스트:**

- [ ] 로그아웃 성공
- [ ] 로그인 성공
- [ ] 미인증 사용자는 로그인 페이지로 리다이렉트

### 3.3 Google OAuth 테스트 (선택)

1. Supabase Dashboard에서 Google OAuth 설정
2. 로그인 페이지의 "Sign in with Google" 클릭
3. Google 계정으로 인증

---

## 다음 단계

### 더 알아보기

- **개발 가이드**: [`CLAUDE.md`](/CLAUDE.md)
- **전체 문서**: [`docs/README.md`](/docs/README.md)
- **프로젝트 요구사항**: [`docs/PRD.md`](/docs/PRD.md)
- **개발 로드맵**: [`docs/ROADMAP.md`](/docs/ROADMAP.md)

### 자주 사용하는 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# ESLint 검사
npm run lint

# 코드 포매팅
npm run format
```

### 배포하기

- **Vercel** (권장): [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/your-repo)
- **다른 플랫폼**: [`CLAUDE.md` > 배포](/CLAUDE.md#배포) 참고

---

## 문제 해결

### 로그인 페이지로 계속 리다이렉트됨

**원인**: 환경 변수가 잘못되었거나 누락됨

**해결책**:

1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` 값 확인
3. 개발 서버 재시작: `npm run dev`

### "Failed to fetch user" 에러

**원인**: Supabase 연결 문제

**해결책**:

1. Supabase 프로젝트 상태 확인 (대시보드)
2. 네트워크 연결 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### Google OAuth 작동 안 함

**원인**: Supabase에서 Google OAuth 설정 미완료

**해결책**:

1. Supabase Dashboard > Authentication > Providers
2. Google provider 활성화
3. OAuth 클라이언트 ID 등록

---

## 추가 지원

- **GitHub Issues**: [프로젝트 Issues](https://github.com/your-repo/issues)
- **Supabase 문서**: [Supabase Docs](https://supabase.com/docs)
- **Next.js 문서**: [Next.js Docs](https://nextjs.org/docs)

---

**작성일:** 2026-09-04  
**버전:** 1.0
