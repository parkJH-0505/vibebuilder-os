# Phase 4 설계서 — 보강 + 폴리싱

> PDCA Design 단계
> 날짜: 2026-02-24
> 기반 문서: `docs/content-experience-strategy.md` Phase 4

---

## 1. 목표

Phase 1~3이 "콘텐츠 경험의 골격"이었다면, Phase 4는 **"세부 질감 향상"**이다.
읽는 즐거움, 사용 편의성, 시각적 완성도를 높인다.

---

## 2. 구현 항목 (ROI 순서)

### 2A. 스크롤 페이드인 애니메이션

**문제**: 긴 챕터를 스크롤할 때 모든 요소가 한꺼번에 보여 단조로움.
**해결**: 섹션, 컴포넌트, 다이어그램이 뷰포트에 진입할 때 fade-in + 미세한 위 이동.

**구현 방식**: `IntersectionObserver` 기반 클라이언트 래퍼 컴포넌트

**파일**: `components/ui/ScrollReveal.tsx` (신규)

```tsx
"use client";
// IntersectionObserver로 뷰포트 진입 시 animate-fade-in-up 클래스 추가
// 기본 threshold: 0.1, 한 번 트리거 후 해제
```

**CSS 키프레임**: `app/globals.css`에 추가

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@theme inline {
  --animate-fade-in-up: fadeInUp 0.5s ease-out forwards;
}
```

**적용 대상**: `not-prose` 클래스를 가진 모든 MDX 컴포넌트에 자동 적용하지 않고, 핵심 시각 요소에만 적용:
- Phase 1 컴포넌트: StepByStep, Tabs, TwoColumn, BeforeAfterCompare
- Phase 2A 인포그래픽: 8종 전부
- Phase 3 컴포넌트: ProgressChecklist, DiagnosticQuiz, LayerDiagram
- Mermaid 다이어그램

**적용 방법 결정 — 직접 래핑 vs. MDX 자동 래핑**:

Option A (MDX 자동): mdxComponents에서 래핑 — 기존 MDX 파일 수정 불필요
```typescript
// mdxComponents.ts
const withReveal = (Component) => (props) => (
  <ScrollReveal><Component {...props} /></ScrollReveal>
);
mdxComponents.StepByStep = withReveal(StepByStep);
```

Option B (수동 래핑): 각 컴포넌트 내부에 ScrollReveal을 직접 적용

**결정: Option A** — MDX 파일을 하나도 건드리지 않으면서 전 컴포넌트에 일괄 적용.

---

### 2B. 코드 블록 복사 버튼

**문제**: 비개발자가 코드 스니펫을 AI에 붙여넣기하고 싶어도 선택이 번거로움.
**해결**: 코드 블록 상단에 "복사" 버튼, 클릭 시 클립보드 복사 + 시각 피드백.

**구현 방식**: CSS + 클라이언트 컴포넌트

`rehype-pretty-code`가 생성하는 `<figure data-rehype-pretty-code-figure>` 안의 `<pre>` 블록에 복사 버튼을 추가.

**파일**: `components/ui/CodeCopyButton.tsx` (신규, "use client")

```tsx
// navigator.clipboard.writeText(codeText)
// 버튼 상태: "복사" → "복사됨!" (2초 후 리셋)
// pre 블록의 textContent를 읽어서 복사
```

**파일**: `components/ui/CodeBlockWrapper.tsx` (신규, "use client")

```tsx
// <pre> 태그를 감싸는 wrapper
// 상단 바: 파일명(있으면) + 복사 버튼
// hover 시 복사 버튼 visible
```

**적용 방법**: `mdxComponents`에 `pre` 태그 오버라이드:

```typescript
mdxComponents.pre = CodeBlockWrapper;
```

**CSS**: `globals.css`에 코드 블록 호버 효과 추가

---

### 2C. ChapterNav 카드형 네비게이션 개선

**문제**: 현재 ChapterNav가 prev/next slug만 받아 slug 텍스트가 그대로 노출됨. 어디로 이동하는지 맥락이 부족.
**해결**: 챕터 제목 + 파트 정보를 함께 표시.

**구현 방식**: 기존 데이터 파이프라인 확장

**1단계 — `lib/chapters.ts` 수정**:

```typescript
// getAdjacentChapters 반환값 확장
interface AdjacentChapter {
  slug: string;
  title: string;
  part: string;
}
export function getAdjacentChapters(slug: string): {
  prev: AdjacentChapter | null;
  next: AdjacentChapter | null;
}
```

각 인접 챕터의 MDX source를 읽어 frontmatter에서 title과 part를 추출하는 간단한 방법 사용. 빌드 시점에 실행되므로 성능 문제 없음.

**2단계 — `app/chapters/[slug]/page.tsx` 수정**:

```tsx
// 기존: <ChapterNav prev={prev} next={next} />
// 변경: <ChapterNav prev={adjPrev} next={adjNext} />
```

**3단계 — `components/chapter/ChapterNav.tsx` 수정**:

기존 `prev: string | null` → `prev: { slug: string; title: string; part: string } | null`로 변경. 카드에 Part 뱃지 + 제목 표시.

---

### 2D. SelfCheck 개선 (딜레이드 리빌)

**문제**: 답변이 즉시 노출되어 독자가 생각할 시간이 없음.
**해결**: "펼쳐서 확인" 클릭 후 2초 딜레이 → 점진적 fade-in으로 답변 노출.

**구현 방식**: 기존 `details/summary`에서 React controlled 방식으로 전환

```tsx
// useState<boolean> — open 상태
// 열기 클릭 → 로딩 인디케이터(2초) → fade-in으로 답변 표시
// "잠시 생각해보세요..." 텍스트와 스피너
```

**주의**: `"use client"` 이미 선언. 기존 MDX 파일 수정 불필요 (props 변경 없음).

---

### 2E. Term 용어 툴팁 컴포넌트

**문제**: 전문 용어가 처음 등장할 때만 설명하고, 이후 챕터에서 재등장 시 독자가 의미를 잊을 수 있음.
**해결**: 용어 위에 마우스 호버(모바일: 탭) 시 짧은 툴팁으로 정의 표시.

**파일**: `components/mdx/Term.tsx` (신규, 서버 컴포넌트 가능)

**MDX 사용법**:
```mdx
<Term def="프론트엔드와 백엔드가 대화하는 약속된 방식">API</Term>
```

**구현**:
```tsx
// CSS-only 툴팁 (title 속성이 아닌 ::after pseudo-element)
// 밑줄 점선 스타일로 용어임을 시각적으로 표시
// 서버 컴포넌트로 구현 가능 (hover는 CSS로 처리)
```

**적용**: 기존 MDX 파일에서 반복 등장하는 핵심 용어를 `<Term>` 래핑하는 작업은 Phase 4 완료 후 점진적으로 진행. Phase 4에서는 컴포넌트 생성 + 몇몇 핵심 챕터에서 시범 적용만.

---

## 3. 파일 변경 범위

### 신규 생성

| 파일 | 유형 |
|------|------|
| `components/ui/ScrollReveal.tsx` | 클라이언트 — IntersectionObserver |
| `components/ui/CodeBlockWrapper.tsx` | 클라이언트 — pre 태그 래핑 |
| `components/mdx/Term.tsx` | 서버 — CSS-only 툴팁 |

### 수정

| 파일 | 변경 내용 |
|------|----------|
| `app/globals.css` | fadeInUp 키프레임 + 코드 블록 스타일 + Term 툴팁 CSS |
| `components/mdx/mdxComponents.ts` | ScrollReveal 래핑 HOC + CodeBlockWrapper 등록 + Term 등록 |
| `components/mdx/index.ts` | Term re-export |
| `components/mdx/SelfCheck.tsx` | 딜레이드 리빌 (details→React controlled) |
| `components/chapter/ChapterNav.tsx` | props 타입 확장 + Part 뱃지 |
| `lib/chapters.ts` | getAdjacentChapters 반환값 확장 |
| `app/chapters/[slug]/page.tsx` | ChapterNav에 title/part 전달 |

### MDX 파일

- **Phase 4에서 MDX 수정 없음** (ScrollReveal 자동 래핑, CodeBlockWrapper mdxComponents 오버라이드)
- Term 시범 적용 시 2~3개 챕터에만 소수 삽입 (별도 후속 작업)

---

## 4. 구현 순서

```
Phase 4-1: globals.css 키프레임 + ScrollReveal 컴포넌트 + mdxComponents 래핑
Phase 4-2: CodeBlockWrapper + mdxComponents.pre 오버라이드 → 빌드 확인
Phase 4-3: ChapterNav 개선 (chapters.ts + page.tsx + ChapterNav.tsx)
Phase 4-4: SelfCheck 딜레이드 리빌 개선
Phase 4-5: Term 컴포넌트 생성 + 등록
Phase 4-6: 빌드 확인 → PDCA Check → 커밋
```

---

## 5. 보류 항목

| 항목 | 보류 이유 |
|------|----------|
| Tier 2~3 에셋 추가 (25개) | 이미지 에셋 없이 추가할 수 있는 것이 제한적. Phase 2B(AI 이미지)와 연계 |
| 코드 블록 라인 하이라이트 | 현재 rehype-pretty-code가 지원하지만, MDX 파일에 메타 문자열 추가 필요. 점진적 적용 |
