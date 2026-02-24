# Phase 2A 설계서 — SVG/CSS 인포그래픽

> PDCA Design 단계
> 날짜: 2026-02-24
> 기반 문서: `docs/content-experience-strategy.md` Phase 2A

---

## 1. 설계 원칙

### 구현 방식: 인라인 React 컴포넌트 (per-chapter)

인포그래픽은 범용 컴포넌트가 아니라 **챕터 전용 일회성 시각물**이다.
따라서 `components/mdx/` 폴더에 범용 컴포넌트로 만들지 않고,
`components/infographics/` 폴더에 챕터별 전용 컴포넌트로 만든다.

```
components/infographics/
├── JourneyRoadmap.tsx      ← ch00 전용
├── IcebergDiagram.tsx      ← ch01 전용
├── RestaurantMapping.tsx   ← ch01 전용
├── MoscowPyramid.tsx       ← ch07 전용
├── PromptFormula.tsx        ← ch10 전용
├── TechDebtGraph.tsx        ← ch11 전용
├── BuilderCycle.tsx         ← ch15 전용
└── FeedbackMatrix.tsx       ← ch15 전용
```

**이유**:
- 각 인포그래픽이 고유한 데이터/형태를 가짐 (범용화 불가)
- MDX에서 `<JourneyRoadmap />` 형태로 직접 사용
- `mdxComponents.ts`에 등록하여 MDX에서 인식

### 스타일 가이드

- **색상**: 프로젝트 기존 Tailwind 색상 체계와 동일
  - 인디고: `#4F46E5` → `indigo-600`
  - 에메랄드: `#10B981` → `emerald-500`
  - 앰버: `#F59E0B` → `amber-500`
  - 로즈: `#EF4444` → `red-500`
  - 바이올렛: `#8B5CF6` → `violet-500`
- **다크모드**: 모든 인포그래픽 `dark:` 대응 필수
- **반응형**: 모바일에서도 읽을 수 있어야 함 (축소/스택 전환)
- **폰트**: Tailwind 기본 (Pretendard 상속)
- **렌더링**: 서버 컴포넌트 기본. 인터랙션 필요 시에만 클라이언트

---

## 2. 우선순위 분류

### Tier 1 — 고임팩트 + 저난이도 (먼저 구현)

| # | 컴포넌트명 | 챕터 | 형태 | 난이도 |
|---|-----------|------|------|--------|
| 1 | **JourneyRoadmap** | ch00 | 4단계 수평 타임라인 (아이디어→기획→구현→런칭) | 1 |
| 2 | **MoscowPyramid** | ch07 | MoSCoW 우선순위 4단 피라미드 | 1 |
| 3 | **PromptFormula** | ch10 | 좋은 프롬프트 4요소 카드 그리드 | 1 |
| 4 | **FeedbackMatrix** | ch15 | 2x2 매트릭스 (영향도 x 빈도) | 1 |
| 5 | **BuilderCycle** | ch15 | 빌더 성장 순환 다이어그램 | 2 |
| 6 | **TechDebtGraph** | ch11 | 기술부채 누적 2곡선 비교 | 2 |
| 7 | **IcebergDiagram** | ch01 | 카카오톡 빙산 (보이는것 vs 숨겨진것) | 2 |

### Tier 2 — 고임팩트 + 중난이도 (다음)

| # | 컴포넌트명 | 챕터 | 형태 | 난이도 |
|---|-----------|------|------|--------|
| 8 | **RestaurantMapping** | ch01 | 식당=프로덕트 5요소 매핑 카드 | 2 |

### Phase 2B 보류 (AI 이미지 필요 — Gemini MCP 미탑재)

| 챕터 | 에셋 | 이유 |
|------|------|------|
| ch00 | 네비게이션 vs 지도 비유 | 일러스트 필요 |
| ch02 | 5가지 장기 아키텍처 | 일러스트 필요 |
| ch04 | 호텔 키카드 3단계 | 일러스트 필요 |
| ch08 | 배포 4가지 톱니바퀴 | 일러스트 필요 |
| ch05 | 배민 서비스 맵, API Key 인포그래픽 | 커넥션 맵은 복잡도 높음, 2차 구현 |
| ch09 | 도구 스펙트럼 | Phase 1 Tabs로 대체됨 |
| ch10 | A씨 vs B씨 플로우 | Phase 1 TwoColumn으로 이미 시각화됨 |
| ch14 | 배포 체크리스트 | Phase 1 StepByStep으로 대체됨 |

---

## 3. Tier 1 컴포넌트 상세 명세

### 3-1. JourneyRoadmap (ch00)

**내용**: 아이디어 → 기획 → 구현 → 런칭, 4단계 수평 타임라인
**Part 연결**: Part 0~1 → Part 2 → Part 3~4 → Part 5

```
[ 🌱 아이디어 ]──→[ 📋 기획 ]──→[ 🔨 구현 ]──→[ 🚀 런칭 ]
   Part 0~1          Part 2        Part 3~4       Part 5
   Ch.0~5           Ch.6~7        Ch.8~13        Ch.14~15
```

**구현**: CSS flexbox 기반, 각 단계 원형 아이콘 + 라벨 + Part 범위
**렌더링**: 서버 컴포넌트
**반응형**: 데스크탑 수평, 모바일 세로 스택

---

### 3-2. IcebergDiagram (ch01)

**내용**: 카카오톡 비유 — 수면 위(보이는 것) vs 수면 아래(숨겨진 것)

```
        ┌─────────┐
        │ 프론트엔드 │  ← 수면 위 (10%)
        │  (화면)   │
~~~~~~~~│~~~~~~~~~│~~~~~~~~ 수면선
        │  API     │
        │ 백엔드    │  ← 수면 아래 (90%)
        │ 데이터베이스│
        │ 인프라    │
        └─────────┘
```

**구현**: CSS clip-path 또는 SVG path로 빙산 형태, 위/아래 영역 구분
**렌더링**: 서버 컴포넌트
**핵심**: "바이브코딩이 만드는 건 수면 위 10%뿐" 메시지 전달

---

### 3-3. MoscowPyramid (ch07)

**내용**: MoSCoW 우선순위 분류 역피라미드

```
     ┌───────────────────┐
     │    Must Have ✅    │  ← 가장 좁음 (첫 버전 필수)
     ├───────────────────┤
     │   Should Have 🟡   │  ← 1차 업데이트
     ├─────────────────────┤
     │   Could Have 🔵     │  ← 여유 있을 때
     ├───────────────────────┤
     │   Won't Have ⬜       │  ← MVP 이후
     └───────────────────────┘
```

**구현**: 4단 역삼각형(위가 좁음), 각 단계별 색상 + 라벨
**렌더링**: 서버 컴포넌트

---

### 3-4. PromptFormula (ch10)

**내용**: 좋은 프롬프트의 4요소 카드

```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ 🎯 맥락   │  │ 📋 구체적  │  │ 🚧 제약    │  │ ✅ 기대    │
│           │  │   지시     │  │   조건     │  │   결과     │
│ "현재 상태 │  │ "정확히 뭘 │  │ "하지 말   │  │ "결과가    │
│  알려주기" │  │  해야하는지"│  │  아야 할 것"│  │  어떤 형태" │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

**구현**: 4열 카드 그리드, 각 카드에 아이콘 + 제목 + 설명
**렌더링**: 서버 컴포넌트
**반응형**: 데스크탑 4열, 태블릿 2열, 모바일 1열

---

### 3-5. TechDebtGraph (ch11)

**내용**: 시간에 따른 두 곡선 비교
- A곡선 (빨강): "부채 무시" → 기능 추가 속도가 급격히 하락
- B곡선 (초록): "주기적 정리" → 속도 유지

```
속도
 ↑
 │  B ─────────────────── (건강한 프로젝트)
 │     ╲
 │  A    ╲
 │         ╲_____________ (기술 부채 누적)
 │
 └────────────────────── 시간 →
```

**구현**: CSS/SVG로 2개의 곡선, 교차점 이후 갈라지는 그래프
**렌더링**: 서버 컴포넌트
**핵심**: "처음에는 같은 속도지만, 부채가 쌓이면 속도가 급락한다"

---

### 3-6. BuilderCycle (ch15)

**내용**: 빌더의 성장 순환 사이클

```
        ┌→ 아이디어 ──→ 기획 ──→ 구현 ──→ 런칭 ──┐
        │                                        │
        └─── 피드백 ←── 데이터 수집 ←── 반응 ←───┘
              ↓
        두 번째 사이클은 더 빠르다
```

**구현**: 원형/타원형 순환 화살표, 중앙에 "반복할수록 빨라진다" 메시지
**렌더링**: 서버 컴포넌트

---

### 3-7. FeedbackMatrix (ch15)

**내용**: 피드백 해석 2x2 매트릭스

```
              빈도 높음
                ↑
     ┌──────────┼──────────┐
     │ 불만이지만 │ 핵심 문제  │
     │ 드문 케이스│ → 즉시 해결│
 영향 │──────────┼──────────│ 영향
 낮음 │ 무시해도  │ 숨은 기회  │ 높음
     │ 괜찮음   │ → 기록     │
     └──────────┼──────────┘
                ↓
              빈도 낮음
```

**구현**: 2x2 그리드, 각 사분면에 라벨 + 색상 + 액션
**렌더링**: 서버 컴포넌트

---

### 3-8. RestaurantMapping (ch01)

**내용**: 식당 = 프로덕트, 5요소 1:1 매핑

```
식당                    프로덕트
─────────────          ─────────────
🍽️ 홀 인테리어    →    💻 프론트엔드
📝 주문서 전달 규격 →    🔗 API
👨‍🍳 주방 + 매니저   →    ⚙️ 백엔드
📦 창고 + 장부     →    🗄️ 데이터베이스
🏗️ 건물 + 전기     →    ☁️ 인프라
```

**구현**: 2열 매핑 카드, 왼쪽(식당 비유) → 화살표 → 오른쪽(IT 구성요소)
**렌더링**: 서버 컴포넌트

---

## 4. 등록 방법

### mdxComponents.ts에 추가

각 인포그래픽은 per-chapter 전용이지만, MDX에서 사용하려면 컴포넌트 매핑에 등록해야 한다.

```typescript
// Phase 2A 인포그래픽
import { JourneyRoadmap } from "../infographics/JourneyRoadmap";
import { IcebergDiagram } from "../infographics/IcebergDiagram";
import { RestaurantMapping } from "../infographics/RestaurantMapping";
import { MoscowPyramid } from "../infographics/MoscowPyramid";
import { PromptFormula } from "../infographics/PromptFormula";
import { TechDebtGraph } from "../infographics/TechDebtGraph";
import { BuilderCycle } from "../infographics/BuilderCycle";
import { FeedbackMatrix } from "../infographics/FeedbackMatrix";
```

### MDX 사용법

```mdx
<!-- ch00-why-now.mdx -->
<JourneyRoadmap />

<!-- ch01-empty-shell.mdx -->
<IcebergDiagram />
<RestaurantMapping />
```

---

## 5. 구현 순서

```
Phase 2A-1 (Tier 1 — 7개, 병렬 가능)
  1. JourneyRoadmap     ← ch00, 난이도 1
  2. MoscowPyramid      ← ch07, 난이도 1
  3. PromptFormula       ← ch10, 난이도 1
  4. FeedbackMatrix      ← ch15, 난이도 1
  5. BuilderCycle        ← ch15, 난이도 2
  6. TechDebtGraph       ← ch11, 난이도 2
  7. IcebergDiagram      ← ch01, 난이도 2

Phase 2A-2 (Tier 2 — 1개)
  8. RestaurantMapping   ← ch01, 난이도 2

Phase 2A-3 (MDX 삽입 + 등록)
  mdxComponents.ts 등록 → 각 MDX에 컴포넌트 태그 삽입

빌드 검증 → 배포
```

---

## 6. 파일 변경 범위

### 신규 생성
| 파일 | 유형 |
|------|------|
| `components/infographics/JourneyRoadmap.tsx` | 서버 컴포넌트 |
| `components/infographics/IcebergDiagram.tsx` | 서버 컴포넌트 |
| `components/infographics/RestaurantMapping.tsx` | 서버 컴포넌트 |
| `components/infographics/MoscowPyramid.tsx` | 서버 컴포넌트 |
| `components/infographics/PromptFormula.tsx` | 서버 컴포넌트 |
| `components/infographics/TechDebtGraph.tsx` | 서버 컴포넌트 |
| `components/infographics/BuilderCycle.tsx` | 서버 컴포넌트 |
| `components/infographics/FeedbackMatrix.tsx` | 서버 컴포넌트 |

### 수정
| 파일 | 변경 내용 |
|------|----------|
| `components/mdx/mdxComponents.ts` | 8개 인포그래픽 import + 매핑 추가 |
| `components/mdx/index.ts` | 8개 re-export 추가 |
| `content/chapters/ch00-why-now.mdx` | JourneyRoadmap 삽입 |
| `content/chapters/ch01-empty-shell.mdx` | IcebergDiagram, RestaurantMapping 삽입 |
| `content/chapters/ch07-mvp.mdx` | MoscowPyramid 삽입 |
| `content/chapters/ch10-talking-to-ai.mdx` | PromptFormula 삽입 |
| `content/chapters/ch11-technical-debt.mdx` | TechDebtGraph 삽입 |
| `content/chapters/ch15-iteration.mdx` | BuilderCycle, FeedbackMatrix 삽입 |
