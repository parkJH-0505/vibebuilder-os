# Phase 3 설계서 — 인터랙티브 강화 컴포넌트

> PDCA Design 단계
> 날짜: 2026-02-24
> 기반 문서: `docs/content-experience-strategy.md` Phase 3

---

## 1. 설계 원칙

### 목표: "보는" 경험 → "참여하는" 경험

Phase 1~2A가 "텍스트 → 시각화" 전환이었다면, Phase 3는 **"수동 읽기 → 능동 참여"** 전환이다.
독자가 클릭하고, 체크하고, 선택하면서 스스로 학습 진도를 확인할 수 있게 한다.

### 구현 제약

- **모든 Phase 3 컴포넌트는 `"use client"`** — useState, useEffect, localStorage 등 클라이언트 API 필수
- **RSC 환경에서의 제약**: `compileMDX`는 서버에서 실행되므로, 클라이언트 컴포넌트는 serializable한 props만 전달 가능 (함수 prop 불가, 문자열/숫자/배열만)
- **localStorage는 hydration 불일치 방지 필수**: SSR 시 초기 상태는 "미체크"로 렌더링 → 클라이언트에서 useEffect로 localStorage 값을 읽어 업데이트
- **기존 SelfCheck와 병렬 존재**: SelfCheck는 "이해 확인"(아코디언), ProgressChecklist는 "완료 추적"(체크박스). 대체가 아니라 보완 관계

### 스타일 가이드 (Phase 1~2A 계승)

| 의미 | 색상 | 적용 |
|------|------|------|
| 진행/완료 추적 | **teal** | ProgressChecklist |
| 진단/퀴즈 | **amber** | DiagnosticQuiz |
| 인터랙티브 탐색 | **indigo** | LayerDiagram, InteractiveFlow |

- **Dark mode**: `light: border-{color}-200 bg-{color}-50 text-{color}-800` ↔ `dark: border-{color}-800 bg-{color}-950 text-{color}-200`
- **not-prose**: 모든 컴포넌트 최외곽에 `not-prose` 적용
- **반응형**: 모바일에서도 터치 타겟 최소 44px, 체크박스/버튼 크기 확보

---

## 2. 우선순위 분류

### Tier 1 — 즉시 구현 (에셋 의존 없음)

| # | 컴포넌트 | 난이도 | 적용 범위 | 이유 |
|---|---------|-------|----------|------|
| 1 | **ProgressChecklist** | 1 | 전 16챕터 | 졸업 테스트를 인터랙티브화, ROI 최고 |
| 2 | **DiagnosticQuiz** | 2 | ch01, ch06, ch07, ch12 | 핵심 의사결정 챕터에 자가 진단 |
| 3 | **LayerDiagram** | 2 | ch01, ch02 | 5가지 구성요소 킬러 시각화 |

### Tier 2 — 조건부 구현 (에셋 또는 추가 설계 필요)

| # | 컴포넌트 | 난이도 | 조건 | 이유 |
|---|---------|-------|------|------|
| 4 | **InteractiveFlow** | 3 | 에셋 불필요하나 구현 복잡도 높음 | 데이터 흐름 체험 — 킬러 피처지만 난이도 3 |
| 5 | **AnnotatedImage** | 2 | **스크린샷 이미지 파일 필요** | Phase 2B(AI/이미지) 보류 중이므로 보류 |

### 결정: Phase 3에서 구현할 것

**Tier 1의 3개(ProgressChecklist, DiagnosticQuiz, LayerDiagram)를 구현한다.**

- AnnotatedImage: 스크린샷 에셋이 없어 보류 (Phase 2B와 함께 진행)
- InteractiveFlow: 난이도 3이며 데이터 구조 복잡. 별도 Phase 3B로 분리 가능

---

## 3. 컴포넌트 상세 명세

### 3-1. ProgressChecklist

**역할**: 각 챕터의 "졸업 테스트" 번호 목록을 클릭 가능한 체크리스트로 변환. localStorage로 진행 상태 영속화.

**MDX 사용법**:
```mdx
<ProgressChecklist chapterId="ch01">
  <CheckItem>내 결과물에 10초 진단법 3가지 테스트를 적용해봤다</CheckItem>
  <CheckItem>IT 프로덕트의 5가지 구성요소를 식당 비유로 설명할 수 있다</CheckItem>
  <CheckItem>덕테이프 스파이럴이 뭔지, 왜 빠지면 안 되는지 설명할 수 있다</CheckItem>
  <CheckItem action>바이브코딩으로 만든 결과물에 새로고침 테스트를 해봤다</CheckItem>
</ProgressChecklist>
```

**Props**:
```typescript
interface ProgressChecklistProps {
  chapterId: string;          // localStorage 키 접두사 (예: "ch01")
  title?: string;             // 기본값: "졸업 테스트"
  children: React.ReactNode;  // <CheckItem> 요소들
}

interface CheckItemProps {
  children: React.ReactNode;  // 체크 항목 텍스트
  action?: boolean;           // true면 "즉시 실행" 스타일 강조
}
```

**동작**:
1. 각 CheckItem은 체크박스 + 라벨
2. 체크 시 localStorage에 `vbos-progress-{chapterId}` 키로 체크 배열 저장
3. 상단에 "N/M 완료" 진행률 표시
4. 모든 항목 체크 시 축하 UI (배경색 변경 + "챕터 완료!" 텍스트)
5. `action` prop이 true인 항목은 별도 아이콘(🔥)과 강조 스타일

**색상**: teal 계열
```
border-teal-200 bg-teal-50/50 dark:border-teal-800 dark:bg-teal-950/30
체크된 항목: text-teal-700 line-through opacity-70
진행률 바: bg-teal-500
```

**렌더링**: 클라이언트 컴포넌트 (`"use client"`)
- `useState<boolean[]>` — 각 항목 체크 상태
- `useEffect` — 마운트 시 localStorage 읽기, 변경 시 저장
- SSR 초기 렌더링: 모든 항목 미체크 → 클라이언트에서 hydrate

**반응형**: 단일 열 (모바일/데스크탑 동일), 터치 타겟 48px

---

### 3-2. DiagnosticQuiz

**역할**: 3~6개의 예/아니오 질문으로 독자의 현재 상태를 진단하고 결과 피드백을 즉시 제공.

**MDX 사용법**:
```mdx
<DiagnosticQuiz
  title="내 결과물은 데모인가, 제품인가?"
  questions={[
    "새로고침하면 입력한 데이터가 살아있나요?",
    "다른 기기에서 로그인해도 같은 데이터가 보이나요?",
    "한 계정의 데이터가 다른 계정에서 안 보이나요?"
  ]}
  results={[
    { range: [0, 1], label: "아직 데모 단계", emoji: "🔴", message: "데이터가 영속되지 않거나, 사용자 구분이 안 되는 상태입니다. 백엔드와 데이터베이스 연결이 필요합니다." },
    { range: [2, 2], label: "반쯤 왔어요", emoji: "🟡", message: "기본적인 데이터 저장은 되지만, 아직 완전한 제품은 아닙니다. 인증과 데이터 분리를 점검해보세요." },
    { range: [3, 3], label: "제품에 가깝습니다!", emoji: "🟢", message: "핵심 기능이 작동하는 상태입니다. 에러 처리와 엣지 케이스를 점검하면 런칭 준비 완료!" }
  ]}
/>
```

**Props**:
```typescript
interface DiagnosticQuizProps {
  title: string;                    // 퀴즈 제목
  questions: string[];              // 예/아니오 질문 배열
  results: DiagnosticResult[];      // 결과 매핑
  description?: string;             // 퀴즈 설명 (제목 아래)
}

interface DiagnosticResult {
  range: [number, number];  // [최소, 최대] "예" 개수 범위
  label: string;            // 결과 라벨 (예: "아직 데모 단계")
  emoji: string;            // 결과 이모지
  message: string;          // 결과 상세 설명
}
```

**동작**:
1. 질문들이 세로 목록으로 나열 (각 질문에 "예/아니오" 버튼 쌍)
2. 모든 질문에 답하면 "예" 개수를 세어 results에서 매칭되는 결과 표시
3. 결과는 아코디언이 아니라 즉시 표시 (fade-in)
4. "다시 하기" 버튼으로 리셋 가능
5. localStorage 저장 없음 (일회성 진단)

**색상**: amber 계열 (기존 SelfCheck와 동일 계열이지만 형태가 다름)
```
외곽: border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/30
"예" 버튼 활성: bg-emerald-100 border-emerald-500 dark:bg-emerald-900/30
"아니오" 버튼 활성: bg-red-100 border-red-500 dark:bg-red-900/30
결과 영역: bg-amber-100 dark:bg-amber-900/30
```

**렌더링**: 클라이언트 컴포넌트 (`"use client"`)
- `useState<(boolean | null)[]>` — 각 질문 답변 (null = 미답변)

**반응형**: 단일 열, 버튼은 가로 배치 (예|아니오)

---

### 3-3. LayerDiagram

**역할**: IT 프로덕트의 5가지 구성요소를 시각적으로 표현하고, 각 레이어를 클릭하면 상세 설명이 펼쳐지는 인터랙티브 다이어그램.

**MDX 사용법**:
```mdx
<LayerDiagram />
```

Props 없이 사용. 데이터는 컴포넌트 내부에 하드코딩 (per-chapter 전용 시각물, Phase 2A 인포그래픽과 동일 원칙).

**내부 데이터 구조**:
```typescript
const layers = [
  {
    id: "frontend",
    icon: "🍽️",
    label: "프론트엔드",
    restaurant: "홀 인테리어",
    color: "indigo",
    description: "사용자가 직접 보고 만지는 화면. 버튼, 입력창, 이미지 배치 등.",
    tools: ["HTML/CSS", "React", "Next.js"],
  },
  {
    id: "api",
    icon: "📝",
    label: "API",
    restaurant: "주문서 전달 규격",
    color: "violet",
    description: "프론트엔드와 백엔드가 대화하는 약속된 방식.",
    tools: ["REST API", "GraphQL"],
  },
  {
    id: "backend",
    icon: "👨‍🍳",
    label: "백엔드",
    restaurant: "주방 + 매니저",
    color: "emerald",
    description: "데이터를 처리하고, 비즈니스 규칙을 실행하는 엔진.",
    tools: ["Node.js", "Python", "Supabase Edge Functions"],
  },
  {
    id: "database",
    icon: "📦",
    label: "데이터베이스",
    restaurant: "창고 + 장부",
    color: "amber",
    description: "모든 데이터를 저장하고 필요할 때 꺼내주는 저장소.",
    tools: ["Supabase", "Firebase", "PlanetScale"],
  },
  {
    id: "infra",
    icon: "🏗️",
    label: "인프라",
    restaurant: "건물 + 전기",
    color: "rose",
    description: "프로덕트가 24시간 돌아가게 하는 기반 시설.",
    tools: ["Vercel", "AWS", "Cloudflare"],
  },
];
```

**동작**:
1. 5개 레이어가 세로 스택으로 쌓인 형태 (위: 프론트엔드, 아래: 인프라)
2. 각 레이어는 아이콘 + 라벨 + 식당 비유가 한 줄에 표시
3. 레이어를 클릭하면 아래로 펼쳐지며 description + tools 목록 표시
4. 상단에 "🍽️ 식당 모드 / 💻 IT 모드" 토글 — 식당 비유 라벨과 IT 라벨을 전환
5. 현재 활성 레이어는 좌측에 인디케이터 바 표시 + 배경색 변경

**레이아웃**:
```
┌─────────────────────────────────┐
│  🍽️ 식당 모드  |  💻 IT 모드    │  ← 토글 (Tabs 스타일)
├─────────────────────────────────┤
│ 🍽️ 홀 인테리어  →  프론트엔드    │  ← 클릭으로 펼침
│  ┌────────────────────────────┐ │
│  │ 사용자가 직접 보고 만지는...│ │  ← 펼침 영역
│  │ 도구: React, Next.js, ...  │ │
│  └────────────────────────────┘ │
│ 📝 주문서 규격  →  API           │
│ 👨‍🍳 주방+매니저  →  백엔드        │
│ 📦 창고+장부   →  데이터베이스    │
│ 🏗️ 건물+전기   →  인프라         │
└─────────────────────────────────┘
```

**색상**: 각 레이어별 고유 색상 (위 데이터 참조)
```
활성 레이어: border-l-4 border-{layer.color}-500 bg-{layer.color}-50/50
비활성: bg-white dark:bg-zinc-900
```

**렌더링**: 클라이언트 컴포넌트 (`"use client"`)
- `useState<string | null>` — 현재 펼쳐진 레이어 ID
- `useState<"restaurant" | "it">` — 모드 토글

**반응형**: 단일 열 (모바일/데스크탑 동일)

---

## 4. 등록 방법

### mdxComponents.ts에 추가

```typescript
// Phase 3 인터랙티브 컴포넌트
import { ProgressChecklist, CheckItem } from "./ProgressChecklist";
import { DiagnosticQuiz } from "./DiagnosticQuiz";
import { LayerDiagram } from "./LayerDiagram";

export const mdxComponents = {
  // ... 기존 컴포넌트 ...
  // Phase 3 인터랙티브
  ProgressChecklist,
  CheckItem,
  DiagnosticQuiz,
  LayerDiagram,
};
```

### index.ts에 추가

```typescript
// Phase 3 인터랙티브 컴포넌트
export { ProgressChecklist, CheckItem } from "./ProgressChecklist";
export { DiagnosticQuiz } from "./DiagnosticQuiz";
export { LayerDiagram } from "./LayerDiagram";
```

### MDX 삽입 위치

**ProgressChecklist** — 전 16챕터 졸업 테스트 위치:

| 챕터 | 대체 대상 | 비고 |
|------|----------|------|
| ch00~ch15 | 각 챕터의 "졸업 테스트" 번호 목록 | 기존 텍스트를 CheckItem으로 변환 |
| ch12 | 추가로 "시작 전 체크리스트"(L270~287)도 변환 | chapterId="ch12-preflight" |

**DiagnosticQuiz** — 4개 챕터:

| 챕터 | 삽입 위치 | 진단 주제 |
|------|----------|----------|
| ch01 | "10초 진단" 표 직후 | "내 결과물은 데모인가, 제품인가?" |
| ch06 | "기능별 난이도" 섹션 SelfCheck 직후 | "이 기능, 얼마나 무거울까?" |
| ch07 | MVP 깎기 Mermaid flowchart 직후 | "이 기능, MVP에 들어가야 할까?" |
| ch12 | "좋은 첫 프로젝트 5가지 조건" 표 직후 | "내 아이디어, 첫 프로젝트로 적합한가?" |

**LayerDiagram** — 2개 챕터:

| 챕터 | 삽입 위치 | 역할 |
|------|----------|------|
| ch01 | StepByStep(5요소 설명) 직후, 비교 표 대체 | 핵심 프레임워크 인터랙티브 각인 |
| ch02 | 챕터 도입부 (5요소 복습 + 확장 맥락) | ch01 프레임워크 재참조 |

---

## 5. 구현 순서

```
Phase 3-1: ProgressChecklist 구현 (난이도 1)
  → 컴포넌트 생성 → mdxComponents 등록 → 빌드 확인

Phase 3-2: 전 16챕터 졸업 테스트 → ProgressChecklist 변환
  → ch00~ch15 MDX 수정 → 빌드 확인

Phase 3-3: DiagnosticQuiz 구현 (난이도 2)
  → 컴포넌트 생성 → mdxComponents 등록 → 빌드 확인

Phase 3-4: 4개 챕터에 DiagnosticQuiz 삽입
  → ch01, ch06, ch07, ch12 MDX 수정 → 빌드 확인

Phase 3-5: LayerDiagram 구현 (난이도 2)
  → 컴포넌트 생성 → mdxComponents 등록 → 빌드 확인

Phase 3-6: 2개 챕터에 LayerDiagram 삽입
  → ch01, ch02 MDX 수정 → 빌드 확인

Phase 3-7: PDCA Check
  → docs/check.md 업데이트 → 배포
```

---

## 6. 파일 변경 범위

### 신규 생성

| 파일 | 유형 |
|------|------|
| `components/mdx/ProgressChecklist.tsx` | 클라이언트 컴포넌트 |
| `components/mdx/DiagnosticQuiz.tsx` | 클라이언트 컴포넌트 |
| `components/mdx/LayerDiagram.tsx` | 클라이언트 컴포넌트 |

### 수정

| 파일 | 변경 내용 |
|------|----------|
| `components/mdx/mdxComponents.ts` | 3개 컴포넌트 import + 매핑 추가 |
| `components/mdx/index.ts` | 3개 re-export 추가 |
| `content/chapters/ch00-why-now.mdx` ~ `ch15-iteration.mdx` | 졸업 테스트 → ProgressChecklist 변환 (16개) |
| `content/chapters/ch01-empty-shell.mdx` | DiagnosticQuiz + LayerDiagram 삽입 |
| `content/chapters/ch02-five-organs.mdx` | LayerDiagram 삽입 |
| `content/chapters/ch06-idea-to-spec.mdx` | DiagnosticQuiz 삽입 |
| `content/chapters/ch07-mvp.mdx` | DiagnosticQuiz 삽입 |
| `content/chapters/ch12-project-planning.mdx` | DiagnosticQuiz 삽입 |

---

## 7. 보류 항목

| 컴포넌트 | 보류 이유 | 재개 조건 |
|---------|----------|----------|
| **AnnotatedImage** | 스크린샷 이미지 에셋 없음 | Phase 2B(이미지 추가) 진행 시 |
| **InteractiveFlow** | 난이도 3, 별도 설계 필요 | Phase 3B로 분리. Phase 3 완료 후 진행 여부 결정 |
