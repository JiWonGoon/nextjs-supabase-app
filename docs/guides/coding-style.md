# 코딩 스타일 가이드

프로젝트의 일관된 코드 품질과 가독성을 유지하기 위한 스타일 가이드입니다.

---

## 1. 명명 규칙

### 1.1 변수 및 함수

```typescript
// ✅ DO: camelCase
const userData = { name: "홍길동", age: 30 };
const getCurrentUser = () => {};
let isLoading = false;
const MAX_RETRIES = 3; // 상수는 UPPER_CASE

// ❌ DON'T: snake_case, PascalCase
const user_data = {};
const GetCurrentUser = () => {};
let is_loading = false;
const maxRetries = 3; // 상수는 대문자 사용
```

### 1.2 컴포넌트 및 클래스

```typescript
// ✅ DO: PascalCase
export function ProfileForm() {}
export const UserProfile: React.FC = () => {};
export class UserService {}

// ❌ DON'T: camelCase
export function profileForm() {}
export const userProfile = () => {};
```

### 1.3 파일 이름

```
// ✅ DO: kebab-case (컴포넌트 및 유틸)
components/
  ├── profile-form.tsx
  ├── user-avatar.tsx
  └── auth-button.tsx

lib/
  ├── actions/
  │   └── profile.ts
  └── utils.ts

pages/
  ├── profile/
  │   └── page.tsx

// ❌ DON'T: PascalCase, snake_case
components/
  ├── ProfileForm.tsx       # 컴포넌트는 파일명도 kebab-case
  ├── userAvatar.tsx
```

### 1.4 데이터베이스 스키마

```typescript
// ✅ DO: snake_case (SQL 표준)
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  full_name TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

// TypeScript: camelCase 변환
interface Profile {
  id: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 2. 코드 포맷팅

### 2.1 들여쓰기 및 공백

```typescript
// ✅ DO: 2칸 스페이스 (Prettier 설정)
function example() {
  if (condition) {
    console.log("indented");
  }
}

// ✅ DO: 파일 끝에 빈 줄 1개
export function someFunction() {
  // code
}
// <- 여기 빈 줄 필수

// ❌ DON'T: 탭, 4칸, 또는 불규칙한 공백
function example() {
  if (condition) {
console.log("wrong");
}
}

// ❌ DON'T: 여러 빈 줄
function example() {


  return null;


}
```

### 2.2 문자열 및 따옴표

```typescript
// ✅ DO: 항상 더블 쿼트
const name = "홍길동";
const message = "Hello, World!";
const template = `안녕하세요, ${name}님`;

// ✅ DO: 백틱으로 템플릿 문자열
const greeting = `Hello, ${firstName} ${lastName}`;

// ❌ DON'T: 싱글 쿼트
const name = 'wrong';
const message = 'incorrect';

// ❌ DON'T: 따옴표 혼용
const mixed = 'don\'t use' + "single quotes";
```

### 2.3 세미콜론

```typescript
// ✅ DO: 항상 세미콜론 사용
const x = 10;
function foo() {
  return 42;
}

// ❌ DON'T: 세미콜론 생략
const x = 10
function foo() {
  return 42
}
```

### 2.4 줄 길이

```typescript
// ✅ DO: 100자 이내 (Prettier 설정)
const longString = "This is a reasonably long string that doesn't exceed 100 chars";

// ✅ DO: 긴 줄은 나누기
const config = {
  name: "MyApp",
  version: "1.0.0",
  description: "A comprehensive description of the application",
};

// ❌ DON'T: 100자 초과
const veryLongString = "This is an extremely long string that exceeds the 100 character limit and should be broken into multiple lines";
```

### 2.5 Trailing Comma

```typescript
// ✅ DO: ES5 스타일 (Prettier 설정)
const array = [
  "item1",
  "item2",
  "item3", // trailing comma
];

const obj = {
  name: "John",
  age: 30, // trailing comma
};

// ❌ DON'T: 마지막에 쉼표 없음
const array = [
  "item1",
  "item2",
  "item3"
];
```

---

## 3. 주석 및 문서화

### 3.1 JSDoc 주석

```typescript
// ✅ DO: 간결하고 명확한 설명
/**
 * 사용자 프로필을 조회합니다.
 */
export async function getProfile(userId: string): Promise<Profile> {
  // implementation
}

/**
 * 폼 검증 및 제출을 처리합니다.
 * @param formData - 폼 데이터
 * @returns 검증 결과
 */
export function validateForm(formData: FormData): ValidationResult {
  // implementation
}

// ❌ DON'T: 불필요한 긴 설명
/**
 * 이 함수는 사용자의 프로필 정보를 데이터베이스에서 조회합니다.
 * 사용자 ID를 입력받아 해당 사용자의 프로필 데이터를 반환합니다.
 * 프로필이 없으면 null을 반환합니다.
 * 에러가 발생하면 에러를 throw합니다.
 */
export async function getProfile(userId: string): Promise<Profile> {}
```

### 3.2 인라인 주석

```typescript
// ✅ DO: 왜(why)를 설명하는 주석
if (status === "pending") {
  // 상태가 pending인 경우만 재시도 시도 (Supabase 사양)
  await retry();
}

// ✅ DO: 복잡한 로직 설명
const encrypted = btoa(JSON.stringify(data));
// btoa: UTF-8 문자열을 base64로 인코딩 (XSS 방지용)

// ❌ DON'T: 무엇(what)만 설명하는 주석
count++; // 카운트 증가
const name = "John"; // 이름을 "John"으로 설정

// ❌ DON'T: 명백한 코드 설명
user.id = generateId(); // ID 생성 및 할당 (불필요)
```

### 3.3 TODO 주석

```typescript
// ✅ DO: TODO는 구체적으로
// TODO: avatar_url 필드 추가 후 프로필 이미지 업로드 기능 구현 (2026-09-15)
// TODO: GitHub API 연동으로 소셜 링크 검증 강화

// ❌ DON'T: 모호한 TODO
// TODO: 나중에 개선
// TODO: fix this
```

---

## 4. 타입 정의

### 4.1 명시적 타입

```typescript
// ✅ DO: 함수 반환 타입 명시
async function getUser(id: string): Promise<User | null> {
  // ...
}

function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
  // ...
}

// ✅ DO: 복잡한 객체는 interface 정의
interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string; // 선택적 필드
}

// ❌ DON'T: any 타입 사용
function handleData(data: any) {} // 타입 안정성 상실

// ❌ DON'T: 타입 생략
async function getUser(id) {
  return null;
}
```

### 4.2 선택적 필드

```typescript
// ✅ DO: 선택적 필드는 ? 명시
interface Profile {
  id: string;
  email: string;
  fullName?: string; // 선택적
  avatarUrl?: string;
}

// ✅ DO: Partial 타입 사용
type PartialProfile = Partial<Profile>;

// ❌ DON'T: null/undefined를 기본값으로
interface Profile {
  fullName: string | null; // null이 명백한 의도가 아니면 ?
}
```

---

## 5. 함수 및 컴포넌트

### 5.1 함수 길이

```typescript
// ✅ DO: 한 함수는 한 가지 일만
export async function getProfile(userId: string): Promise<Profile> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("인증이 필요합니다");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ❌ DON'T: 너무 길거나 여러 책임
async function getUserAndValidateAndSaveAndNotify(userId) {
  // 너무 많은 로직... (200줄 이상)
}
```

### 5.2 매개변수

```typescript
// ✅ DO: 3개 이하의 매개변수
function updateUser(id: string, name: string, email: string) {}

// ✅ DO: 많은 매개변수는 객체로
function createUser(options: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}) {}

// ❌ DON'T: 5개 이상의 매개변수
function createUser(name, email, phone, address, company, country, city) {}
```

### 5.3 컴포넌트 구조

```typescript
// ✅ DO: 명확한 구조
export interface ProfileFormProps {
  userId: string;
  onSuccess?: () => void;
}

export function ProfileForm({ userId, onSuccess }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  async function onSubmit(data: UpdateProfileInput) {
    setIsLoading(true);
    try {
      await updateProfile(data);
      onSuccess?.();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  );
}
```

---

## 6. Error Handling

### 6.1 에러 처리 패턴

```typescript
// ✅ DO: 명시적 에러 처리
async function getUserData(userId: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(`프로필 조회 실패: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("오류:", error);
    throw error; // 또는 사용자 친화적 메시지 반환
  }
}

// ❌ DON'T: 에러 무시
async function getUserData(userId: string) {
  try {
    // code
  } catch (error) {
    // 에러 무시
  }
}

// ❌ DON'T: 일반적인 에러만 처리
async function getUserData(userId: string) {
  if (!userId) {
    return null; // 조용히 실패
  }
  // code
}
```

### 6.2 에러 메시지

```typescript
// ✅ DO: 사용자 친화적 메시지
if (error) {
  throw new Error("프로필을 불러올 수 없습니다. 나중에 다시 시도해주세요.");
}

// ✅ DO: 기술적 정보는 로그에만
console.error("Supabase 오류:", error.message, error.code);

// ❌ DON'T: 기술적 메시지를 사용자에게
throw new Error(`PGRST116: Row not found or multiple rows returned`);
```

---

## 7. 조건문 및 루프

### 7.1 조건문

```typescript
// ✅ DO: 가드 클로즈
function processUser(user: User | null) {
  if (!user) return; // 조건 먼저, 일찍 반환

  // user 관련 로직
  console.log(user.name);
}

// ✅ DO: 간결한 삼항 연산자
const status = isActive ? "활성" : "비활성";

// ❌ DON'T: 깊은 중첩
if (user) {
  if (user.email) {
    if (user.isVerified) {
      // 로직
    }
  }
}

// ❌ DON'T: 복잡한 삼항 연산자
const status = isActive ? "활성" : isPending ? "대기" : "비활성"; // 쓰기 어려움
// 대신 if-else 사용
```

### 7.2 루프

```typescript
// ✅ DO: 고차 함수 선호
const names = users.map((user) => user.name);
const activeUsers = users.filter((user) => user.isActive);
const totalAge = users.reduce((sum, user) => sum + user.age, 0);

// ✅ DO: forEach 명확한 부수 효과
users.forEach((user) => {
  console.log(user.name);
});

// ❌ DON'T: 전통적 for 루프 (필요한 경우 제외)
for (let i = 0; i < users.length; i++) {
  console.log(users[i].name);
}

// ❌ DON'T: for-in (배열에는 사용 금지)
for (const index in users) {
  // 배열의 인덱스는 문자열
}
```

---

## 8. Import/Export

### 8.1 Import 순서

```typescript
// ✅ DO: 순서대로 정렬
// 1. 외부 라이브러리
import React, { useState } from "react";
import { createClient } from "@supabase/ssr";

// 2. 내부 모듈
import { getProfile } from "@/lib/actions/profile";
import { Profile } from "@/lib/types/profile";

// 3. 상대 경로
import { Button } from "./button";

// ❌ DON'T: 무작위 순서
import { Button } from "./button";
import React from "react";
import { getProfile } from "@/lib/actions/profile";
```

### 8.2 Named vs Default Export

```typescript
// ✅ DO: Named Export 선호 (재명명, 리팩토링 용이)
export function ProfileForm() {}
export function UserAvatar() {}
export interface ProfileFormProps {}

// ✅ DO: 페이지는 Default Export
// app/protected/profile/page.tsx
export default function ProfilePage() {}

// ❌ DON'T: 컴포넌트에 Default Export
// 이름이 자동으로 임포트 이름이 되어 혼란 야기
export default function () {}
```

---

## 9. React 패턴

### 9.1 Hooks 규칙

```typescript
// ✅ DO: 최상위에서만 호출
export function UserProfile() {
  const [data, setData] = useState(null); // 최상위 ✓
  
  if (data) {
    const [filtered] = useState(null); // ❌ 조건부 호출
  }

  return null;
}

// ✅ DO: Custom Hooks로 로직 분리
function useUserProfile(userId: string) {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    getProfile(userId).then(setProfile);
  }, [userId]);

  return profile;
}

export function ProfilePage() {
  const profile = useUserProfile("123");
  return <div>{profile?.name}</div>;
}
```

### 9.2 Props 전달

```typescript
// ✅ DO: 필요한 props만 전달
interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export function Card({ title, description, onClick }: CardProps) {}

// ❌ DON'T: 전체 객체 전달
export function Card({ data }: { data: any }) {
  // data.title, data.description 등 불명확
}

// ❌ DON'T: Spread 남용
<Component {...props} /> // 어떤 props가 전달되는지 불명확
```

---

## 10. 테스트 코드

### 10.1 테스트 작성

```typescript
// ✅ DO: 명확한 테스트 이름
describe("ProfileForm", () => {
  it("사용자가 프로필 정보를 제출할 수 있다", () => {
    // arrange
    const { getByRole } = render(<ProfileForm />);
    
    // act
    fireEvent.change(getByRole("textbox"), { target: { value: "John" } });
    fireEvent.click(getByRole("button", { name: /제출/i }));
    
    // assert
    expect(mockUpdateProfile).toHaveBeenCalledWith({ fullName: "John" });
  });

  it("빈 필드로는 제출할 수 없다", () => {
    // ...
  });
});

// ❌ DON'T: 모호한 테스트 이름
it("테스트 1", () => {});
it("폼 테스트", () => {}); // 무엇을 테스트?
```

---

## 11. 성능 최적화

### 11.1 Memoization

```typescript
// ✅ DO: 비용이 큰 컴포넌트는 메모이제이션
import { memo } from "react";

export const UserCard = memo(function UserCard({ user }: UserCardProps) {
  return <div>{user.name}</div>;
});

// ✅ DO: 콜백 메모이제이션
const handleSubmit = useCallback(
  (data: FormData) => {
    updateProfile(data);
  },
  [updateProfile]
);

// ❌ DON'T: 불필요한 메모이제이션
const Counter = memo(function Counter() {
  // 단순한 컴포넌트는 메모이제이션 이득 없음
  return <div>{count}</div>;
});
```

---

## 12. Prettier 및 ESLint 설정

### 12.1 Prettier 설정 (.prettierrc.json)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### 12.2 ESLint 설정 (eslint.config.mjs)

```javascript
// 프로젝트의 ESLint 설정 참고
// 자동 검사는 lint-staged로 수행됨
```

### 12.3 자동 포매팅

```bash
# ESLint 자동 수정
npm run lint:fix

# Prettier 포매팅
npm run format

# 타입 검사
npm run type-check

# 모두 실행
npm run lint:fix && npm run format && npm run type-check
```

---

## 13. 자주하는 실수

```typescript
// ❌ 실수 1: 불필요한 useEffect
export function User() {
  const [name, setName] = useState("");
  
  useEffect(() => {
    setName("John"); // 렌더링마다 실행됨
  });

  return <div>{name}</div>;
}

// ✅ 올바른
export function User() {
  const [name] = useState("John");
  return <div>{name}</div>;
}

// ❌ 실수 2: 의존성 배열 생략
useEffect(() => {
  fetchData(userId);
  // userId 변경 시 재실행 안 됨
}, []); // 의존성 배열 불완전

// ✅ 올바른
useEffect(() => {
  fetchData(userId);
}, [userId]);

// ❌ 실수 3: 렌더링 중 상태 업데이트
export function Form() {
  const [value, setValue] = useState("");
  
  setValue("default"); // 렌더링 중 상태 업데이트 금지!

  return <input value={value} />;
}

// ✅ 올바른
export function Form() {
  const [value, setValue] = useState("default");
  return <input value={value} />;
}
```

---

## 참고 자료

- [Prettier 공식 문서](https://prettier.io)
- [ESLint 공식 문서](https://eslint.org)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs)
- [React 문서](https://react.dev)
- [프로젝트 shrimp-rules](../shrimp-rules.md)

---

**문서 버전**: 1.0  
**최종 업데이트**: 2026-09-04  
**도구**: Prettier 3.0+, ESLint 8.0+
