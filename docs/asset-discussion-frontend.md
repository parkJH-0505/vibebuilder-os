# 프론트엔드 인터랙션 & 비주얼 에셋 제안서

> 작성: 프론트엔드 인터랙션 전문가 에이전트
> 날짜: 2026-02-24
> 대상: Vibe Builder OS 웹 가이드 (16챕터, Next.js 16 + MDX)

---

## 현황 진단

### 현재 상태
- **이미지**: 0개. 16챕터 전체가 순수 텍스트 + Mermaid 6개(ch02~ch04에만 집중)
- **인터랙티브 요소**: SelfCheck 아코디언 1종이 유일한 인터랙션
- **레이아웃**: 단일 컬럼, 선형 텍스트 흐름. 모든 챕터가 동일한 시각적 리듬
- **기존 컴포넌트 6종**: SelfCheck(아코디언), Callout(3타입), KeyTakeaway, ActionItem, NextPreview, Mermaid

### 핵심 문제
책을 PDF로 읽는 것과 웹에서 읽는 것의 차이가 없다. "웹이기 때문에 가능한 것"이 SelfCheck의 details/summary 토글 하나뿐이다. 이는 비개발자 대상 교육 콘텐츠에서 큰 기회 손실이다 -- 인터랙션이야말로 비개발자가 추상적 개념을 체감하는 가장 강력한 도구이기 때문이다.

---

## 1. 새로 만들어야 할 컴포넌트

### 1-1. InteractiveFlow (인터랙티브 데이터 흐름 시각화)

**학습 효과**: ch03 "데이터의 여행"의 6단계를 정적 Mermaid 다이어그램이 아니라 **사용자가 직접 클릭하며 단계별로 따라가는** 애니메이션으로 체험. "버튼을 누르면 데이터가 어디로 가는지"를 말로 설명하는 것과 눈으로 보는 것은 차원이 다르다.

**동작 방식**:
- 프론트엔드 → API → 백엔드 → DB → 응답의 각 노드가 화면에 배치
- "다음 단계" 버튼 또는 자동 재생으로 데이터 패킷(작은 원)이 노드 사이를 이동하는 애니메이션
- 각 단계에 도달하면 해당 노드가 하이라이트되고, 설명 텍스트가 표시
- 에러 시나리오도 시뮬레이션 가능 (401, 500 등 -- 경로 중간에서 빨간색으로 멈춤)

**구현 난이도**: 3/5
- CSS 애니메이션 + useState로 현재 단계 관리
- SVG 또는 절대 위치 div로 노드/경로 렌더링
- 외부 라이브러리 불필요 (framer-motion 쓰면 더 부드럽지만 필수 아님)

**MDX 사용 예시**:
```jsx
<InteractiveFlow
  steps={[
    { node: "사용자", label: "전송 버튼 클릭", description: "프론트엔드가 클릭 이벤트를 감지합니다" },
    { node: "프론트엔드", label: "HTTP 요청 생성", description: "URL + Method + Headers + Body를 포장합니다" },
    { node: "API", label: "POST /messages", description: "인터넷을 통해 서버로 전달됩니다" },
    { node: "백엔드", label: "인증 확인 + 처리", description: "로그인 확인 후 메시지를 처리합니다" },
    { node: "DB", label: "메시지 저장", description: "데이터베이스에 영구 저장됩니다" },
    { node: "프론트엔드", label: "화면 업데이트", description: "말풍선이 나타납니다" }
  ]}
  caption="카카오톡 메시지 전송의 6단계"
/>
```

**적합한 챕터**: ch03 (데이터의 여행), ch04 (인증 흐름), ch05 (외부 서비스 연동 흐름)

---

### 1-2. BeforeAfterCompare (전후 비교 슬라이더)

**학습 효과**: 나쁜 프롬프트 vs 좋은 프롬프트, 데모 vs 제품, 정적 vs 동적 등 "대비"가 핵심인 내용을 시각적으로 체감. 텍스트 테이블보다 인지 부하가 낮고 기억에 남는다.

**동작 방식**:
- 좌우 패널이 나란히 놓이고, 중앙의 드래그 핸들로 비율 조절
- 또는 탭 전환 방식으로 "Before / After" 토글
- 코드 비교 시 diff 하이라이팅 지원

**구현 난이도**: 2/5
- CSS resize 또는 드래그 핸들 + 퍼센트 기반 width
- 이미지 비교와 텍스트/코드 비교 모두 지원

**MDX 사용 예시**:
```jsx
<BeforeAfterCompare
  beforeLabel="나쁜 프롬프트"
  afterLabel="좋은 프롬프트"
  before="쇼핑몰 만들어줘."
  after="이미지 공유 앱을 만들 거야. Phase 1으로 Supabase를 이용해 '사용자'와 '게시물'의 데이터베이스 스키마(SQL)만 먼저 짜줘. 프론트엔드 코드는 아직 작성하지 마."
/>
```

**적합한 챕터**: ch01 (데모 vs 제품), ch06 (나쁜 기획 vs PRD), ch10 (나쁜 프롬프트 vs 좋은 프롬프트)

---

### 1-3. LayerDiagram (5가지 레이어 인터랙티브 다이어그램)

**학습 효과**: ch01~ch02의 핵심인 "5가지 구성요소"를 **클릭하면 펼쳐지는 인터랙티브 다이어그램**으로 제공. 식당 비유 레이어와 IT 프로덕트 레이어를 오버레이로 전환 가능. 정적 테이블을 읽는 것보다 구조적 이해가 깊어진다.

**동작 방식**:
- 5개 레이어가 수직 스택으로 배치 (프론트엔드 ~ 인프라)
- 각 레이어 클릭 시 해당 구성요소의 상세 설명이 슬라이드 아웃
- "식당 모드 / IT 모드" 토글로 비유와 실제 개념을 전환
- 각 레이어에 도구 아이콘 배치 가능 (Supabase, Vercel 등이 어디에 위치하는지)

**구현 난이도**: 2/5
- 5개의 클릭 가능한 div + 조건부 렌더링
- CSS transition으로 펼침/접힘 애니메이션

**MDX 사용 예시**:
```jsx
<LayerDiagram
  mode="toggle" // "restaurant" | "tech" | "toggle"
  highlight={["frontend", "database"]} // 현재 강조할 레이어
  tools={{ backend: "Supabase", frontend: "Next.js", infra: "Vercel" }}
/>
```

**적합한 챕터**: ch01 (빈 껍데기 진단), ch02 (5가지 장기 해부), ch05 (외부 서비스가 채우는 곳)

---

### 1-4. DiagnosticQuiz (자가 진단 인터랙티브 퀴즈)

**학습 효과**: ch01의 "10초 진단", ch06의 "기능 복잡도 체크리스트" 등을 **클릭 기반 자가 진단 도구**로 변환. 패시브하게 읽기만 하는 것이 아니라 능동적으로 판단을 내리면서 개념이 체화된다.

**동작 방식**:
- 질문을 하나씩 제시 (체크박스 또는 라디오 버튼)
- 모든 답변 후 결과를 즉시 표시 (점수, 카테고리 분류, 맞춤 피드백)
- 결과에 따라 "이 챕터를 다시 읽어보세요" 같은 맞춤 안내 가능
- 데이터는 localStorage에만 저장 (서버 불필요)

**구현 난이도**: 2/5
- useState로 답변 상태 관리, 결과 계산은 순수 함수
- 답변 배열을 prop으로 받는 범용 컴포넌트

**MDX 사용 예시**:
```jsx
<DiagnosticQuiz
  title="내 결과물은 데모인가, 제품인가?"
  questions={[
    {
      text: "새로고침해도 데이터가 남아 있나요?",
      options: ["예", "아니오"],
      correctIndex: 0,
      explanation: "데이터가 사라진다면 데이터베이스가 연결되지 않은 상태입니다."
    },
    {
      text: "내 계정과 남의 계정이 분리되나요?",
      options: ["예", "아니오"],
      correctIndex: 0,
      explanation: "계정이 분리되지 않는다면 인증/인가 로직이 빠져 있습니다."
    },
    {
      text: "다른 기기에서도 똑같이 작동하나요?",
      options: ["예", "아니오"],
      correctIndex: 0,
      explanation: "다른 기기에서 안 된다면 배포가 제대로 되지 않은 것입니다."
    }
  ]}
  results={{
    "3": "축하합니다! 최소한의 '제품' 수준입니다.",
    "2": "거의 다 왔습니다. 빠진 한 가지를 채우면 제품이 됩니다.",
    "1": "아직 '데모' 단계입니다. 어느 부분이 빠졌는지 확인하세요.",
    "0": "프론트엔드만 있는 상태입니다. 걱정 마세요, 여기서부터 시작합니다."
  }}
/>
```

**적합한 챕터**: ch01 (10초 진단), ch06 (기능 복잡도 체크리스트), ch07 (MVP 범위 결정), ch12 (프로젝트 선택)

---

### 1-5. StepByStep (스텝-바이-스텝 가이드)

**학습 효과**: ch13 "Build Loop", ch10 "에러 리포트 3요소" 같은 순차적 프로세스를 **한 단계씩 진행하는 인터랙티브 워크스루**로 제공. 긴 텍스트 나열보다 집중력이 높고, 현재 위치를 시각적으로 확인할 수 있다.

**동작 방식**:
- 좌측에 진행 표시 스텝퍼 (번호 + 상태 표시)
- 중앙에 현재 단계의 상세 내용
- "다음 / 이전" 버튼으로 단계 이동
- 완료한 단계는 체크 표시

**구현 난이도**: 1/5
- useState로 현재 단계 인덱스 관리
- children을 step 배열로 받아 조건부 렌더링

**MDX 사용 예시**:
```jsx
<StepByStep title="Build Loop">
  <Step number={1} title="Plan (계획)">
    AI에게 코드를 시키기 전에, 먼저 계획을 요청합니다.
    "이 기능을 구현하려면 어떤 파일을 수정해야 하는지 먼저 알려줘."
  </Step>
  <Step number={2} title="Build (실행)">
    계획이 납득되면 실행을 승인합니다.
    "좋아, 그 계획대로 진행해줘."
  </Step>
  <Step number={3} title="Verify (검증)">
    브라우저에서 직접 확인합니다. F12 Network 탭을 열고 기능을 테스트합니다.
  </Step>
  <Step number={4} title="Commit (저장)">
    작동이 확인되면 git commit으로 안전하게 저장합니다.
  </Step>
  <Step number={5} title="Next (다음)">
    다음 기능으로 넘어갑니다. 같은 루프를 반복합니다.
  </Step>
</StepByStep>
```

**적합한 챕터**: ch03 (디버깅 순서), ch10 (에러 리포트 3요소, AI 루프 탈출), ch13 (Build Loop)

---

### 1-6. ToolMap (도구 지도 인터랙티브 매핑)

**학습 효과**: ch02의 "도구 지도" 테이블을 **클릭/호버 가능한 시각적 매핑**으로 전환. 도구를 클릭하면 어떤 구성요소를 채우는지 시각적으로 하이라이트되고, 구성요소를 클릭하면 해당하는 도구들이 표시된다. 양방향 탐색이 가능해 이해가 깊어진다.

**동작 방식**:
- 상단에 5가지 구성요소 카드가 가로로 배치
- 하단에 도구 카드들이 배치
- 도구를 클릭하면 관련 구성요소에 연결선이 그어지며 하이라이트
- 구성요소를 클릭하면 관련 도구들이 하이라이트
- 모바일에서는 세로 레이아웃으로 자동 전환

**구현 난이도**: 3/5
- 도구-구성요소 매핑 데이터를 prop으로 받음
- SVG 연결선 또는 CSS border 기반 하이라이트
- hover/click 상태 관리

**MDX 사용 예시**:
```jsx
<ToolMap
  tools={[
    { name: "Supabase", covers: ["api", "backend", "database", "infra"], type: "platform" },
    { name: "Vercel", covers: ["frontend", "api", "backend", "infra"], type: "platform" },
    { name: "Lovable", covers: ["frontend", "api", "backend", "database"], type: "builder" },
    { name: "Cursor", covers: ["frontend", "api", "backend", "database"], type: "editor" }
  ]}
/>
```

**적합한 챕터**: ch02 (도구 지도), ch05 (외부 서비스 매핑), ch09 (도구 생태계)

---

### 1-7. CodePlayground (코드 미리보기/실험 공간)

**학습 효과**: ch02의 JSON 예시, ch04의 JWT 토큰 구조, ch10의 프롬프트 예시 등을 **실시간으로 편집하고 결과를 볼 수 있는** 인라인 에디터. 비개발자에게 "코드가 무서운 것이 아니다"를 체험시키는 효과.

**동작 방식**:
- 읽기 전용 모드 (기본): 구문 강조된 코드 블록 + 라인별 주석 표시
- 편집 모드 (선택적): 특정 값을 바꾸면 결과가 실시간 변경
- 예: JSON Body에서 "빨래하기"를 "설거지하기"로 바꾸면 API 응답 예시도 변경
- 코드 실행은 하지 않음 (순수 텍스트 변환/미리보기만)

**구현 난이도**: 3/5
- 이미 shiki가 설치되어 있으므로 구문 강조는 해결됨
- contenteditable 또는 textarea + 실시간 파싱
- 보안: 코드 실행 없이 텍스트 변환만 수행

**MDX 사용 예시**:
```jsx
<CodePlayground
  language="json"
  editable={["title", "completed"]}
  code={`{
  "title": "빨래하기",
  "completed": false,
  "user_id": "abc-123"
}`}
  annotations={{
    1: "할일 제목 — 사용자가 입력한 텍스트",
    2: "완료 여부 — true 또는 false",
    3: "사용자 ID — 자동 부여됨"
  }}
/>
```

**적합한 챕터**: ch02 (JSON 구조), ch03 (HTTP 요청/응답), ch04 (JWT 토큰 구조), ch10 (프롬프트 구조)

---

### 1-8. ProgressChecklist (진행 체크리스트)

**학습 효과**: 각 챕터의 "졸업 테스트"를 **클릭 가능한 체크리스트**로 변환. 체크하면 localStorage에 저장되어 다음 방문 시에도 진행 상태가 유지된다. "얼마나 이해했는지" 스스로 추적하는 메타인지 도구.

**동작 방식**:
- 체크리스트 아이템을 클릭하면 완료 표시
- 전체 진행률 표시 (예: 3/5 완료)
- localStorage 기반 영구 저장
- 챕터 완료 시 축하 애니메이션 (선택적)

**구현 난이도**: 1/5
- 체크박스 상태 + localStorage 연동
- 가장 단순한 인터랙티브 컴포넌트

**MDX 사용 예시**:
```jsx
<ProgressChecklist
  chapterId="ch01"
  items={[
    "10초 진단법 3가지 테스트를 내 결과물에 적용해봤다",
    "5가지 구성요소를 식당 비유로 설명할 수 있다",
    "덕테이프 스파이럴이 뭔지 설명할 수 있다",
    "바이브코딩으로 만든 결과물에 새로고침 테스트를 해봤다"
  ]}
/>
```

**적합한 챕터**: 모든 챕터 (ch00~ch15, 졸업 테스트 섹션)

---

### 1-9. AnnotatedImage (주석 달린 이미지/스크린샷)

**학습 효과**: 브라우저 개발자 도구 스크린샷, Supabase 대시보드, Vercel 배포 화면 등을 **번호 마커 + 호버/클릭 시 설명 팝업**으로 표시. 스크린샷만 보여주면 비개발자는 어디를 봐야 할지 모른다. 주석이 있어야 시선이 유도된다.

**동작 방식**:
- 이미지 위에 번호가 매겨진 마커 배치
- 마커 클릭/호버 시 설명 툴팁 표시
- 이미지 확대(zoom) 지원
- 반응형: 모바일에서는 마커 하단에 설명 리스트로 대체

**구현 난이도**: 2/5
- 이미지 + 절대 위치 마커 + 조건부 툴팁
- 마커 좌표는 퍼센트 기반으로 반응형 대응

**MDX 사용 예시**:
```jsx
<AnnotatedImage
  src="/images/ch03-network-tab.png"
  alt="브라우저 Network 탭에서 API 요청 확인하기"
  markers={[
    { x: 15, y: 8, label: "1", text: "Network 탭을 클릭합니다" },
    { x: 45, y: 35, label: "2", text: "요청 URL과 HTTP 메서드를 확인합니다" },
    { x: 70, y: 35, label: "3", text: "상태 코드를 확인합니다 (200, 401, 500 등)" },
    { x: 45, y: 70, label: "4", text: "Response 탭에서 서버 응답 데이터를 확인합니다" }
  ]}
/>
```

**적합한 챕터**: ch03 (Network 탭 사용법), ch04 (Supabase Auth 대시보드), ch08 (Vercel 배포 화면), ch09 (도구 UI), ch12 (Supabase 테이블 설정)

---

### 1-10. Tabs (탭 전환 컴포넌트)

**학습 효과**: ch02의 "SQL vs NoSQL", ch09의 "도구별 비교" 등 병렬 정보를 **탭으로 전환**하며 비교. 한 화면에 모든 정보를 쏟아붓는 대신, 독자가 관심 있는 것부터 선택적으로 탐색할 수 있다.

**동작 방식**:
- 탭 헤더 클릭으로 콘텐츠 전환
- 활성 탭 하이라이트
- 키보드 내비게이션 (접근성)
- 콘텐츠 영역에 MDX children 렌더링

**구현 난이도**: 1/5
- 가장 기본적인 UI 패턴, useState 하나로 구현

**MDX 사용 예시**:
```jsx
<Tabs labels={["SQL (관계형)", "NoSQL (비관계형)"]}>
  <Tab>
    엑셀 시트처럼 정해진 열이 있고, 테이블 간 관계를 만들 수 있습니다.
    데이터 정확성이 생명인 서비스에 적합합니다.
    **대표**: PostgreSQL (Supabase)
  </Tab>
  <Tab>
    자유로운 스크랩북에 가깝습니다. 형식이 자유로워서 빠르게 변하는 데이터에 유리합니다.
    **대표**: Firestore (Firebase)
  </Tab>
</Tabs>
```

**적합한 챕터**: ch02 (SQL vs NoSQL), ch05 (서비스별 비교), ch09 (도구 카테고리별 비교), ch10 (나쁜 프롬프트 vs 좋은 프롬프트)

---

## 2. 기존 컴포넌트 개선안

### 2-1. SelfCheck 개선

**현재**: details/summary 기반 아코디언. 기능적으로 동작하지만, 시각적 피드백이 약하고 "생각하는 시간"을 유도하지 않음.

**개선안**:
1. **딜레이드 리빌(Delayed Reveal)**: "펼쳐서 확인" 클릭 시 즉시 열리지 않고, 3초 카운트다운 표시 후 열림. "먼저 생각하세요" 효과. (opt-in, `delay` prop)
2. **힌트 프로그레시브 공개**: 힌트가 있을 때, 첫 번째 클릭에서 힌트만 표시, 두 번째 클릭에서 답변 공개 (2단계 리빌)
3. **자기 답변 입력란**: textarea를 추가하여 독자가 자신의 생각을 적은 후 정답을 볼 수 있게. 입력 내용은 localStorage에 저장되어 나중에 복습 가능

**구현 난이도**: 2/5

### 2-2. Callout 개선

**현재**: 3가지 타입(tip/warning/info). 시각적으로 잘 구분되지만 정적임.

**개선안**:
1. **"danger" 타입 추가**: 보안 경고, 데이터 손실 위험 등 치명적 경고에 사용 (빨간 배경)
2. **"example" 타입 추가**: 코드 예시나 실전 사례를 담는 전용 타입 (보라 배경)
3. **접기/펼치기 모드**: `collapsible` prop을 추가하여 긴 Callout을 접을 수 있게
4. **아이콘 커스터마이징**: `icon` prop으로 기본 이모지 대신 커스텀 아이콘 사용 가능

**구현 난이도**: 1/5

### 2-3. KeyTakeaway / ActionItem 개선

**현재**: 정적 박스. 읽고 지나가게 됨.

**개선안**:
1. **KeyTakeaway에 체크박스 모드**: 각 포인트 앞에 체크박스를 추가하여, "이해했으면 체크" 가능. localStorage 저장
2. **ActionItem에 타이머**: "5분이면 됩니다" 같은 시간 표시 + 선택적 타이머 버튼. 클릭하면 카운트다운 시작
3. **ActionItem에 완료 버튼**: "해봤어요!" 클릭 시 완료 상태로 전환. 진행률 추적에 활용

**구현 난이도**: 1/5

---

## 3. 레이아웃 패턴

현재 모든 챕터가 동일한 단일 컬럼 텍스트 흐름이다. 이것을 깨는 방법들:

### 3-1. StickyAside (고정 사이드 패널)

**학습 효과**: 긴 설명을 읽을 때 관련 다이어그램이나 코드 예시가 스크롤해도 화면에 고정됨. 텍스트와 시각 자료를 동시에 참조 가능.

**동작 방식**:
- 데스크탑: 메인 콘텐츠 우측에 `position: sticky` 패널
- 모바일: 일반 흐름으로 폴백 (sticky 해제)
- 내용: 다이어그램, 코드 스니펫, 용어 정리 등

**구현 난이도**: 1/5 (CSS sticky만으로 구현)

**MDX 사용 예시**:
```jsx
<StickyAside aside={
  <Mermaid chart="..." caption="데이터 흐름 전체 구조" />
}>
  여기에 본문 텍스트가 옵니다. 스크롤해도 우측의 다이어그램은 고정되어
  텍스트와 다이어그램을 동시에 참조할 수 있습니다...
</StickyAside>
```

**적합한 챕터**: ch02 (5가지 장기 해부 -- 다이어그램 고정), ch03 (디버깅 플로우차트 고정), ch06 (PRD 템플릿 고정)

---

### 3-2. TwoColumn (2단 비교 레이아웃)

**학습 효과**: 좌우 대비가 자연스러운 콘텐츠에 사용. 표보다 시각적으로 강력하고, 공간 효율이 높다.

**동작 방식**:
- 데스크탑: 2단 그리드
- 모바일: 세로 스택으로 자동 전환
- 각 컬럼에 MDX children 렌더링

**구현 난이도**: 1/5 (Tailwind grid 클래스)

**MDX 사용 예시**:
```jsx
<TwoColumn>
  <Column label="정적 웹사이트">
    - 누가 봐도 같은 화면
    - 데이터 저장 불가
    - 포트폴리오, 회사 소개
  </Column>
  <Column label="동적 웹 애플리케이션">
    - 사용자마다 다른 화면
    - 데이터 저장/조회/수정
    - 카카오톡, 배민, 인스타
  </Column>
</TwoColumn>
```

**적합한 챕터**: ch01 (정적 vs 동적), ch02 (SQL vs NoSQL), ch06 (PRD 없이 vs PRD 있으면), ch10 (나쁜 vs 좋은 프롬프트)

---

### 3-3. Timeline (타임라인 레이아웃)

**학습 효과**: ch00의 "4단계 여정", ch07의 MVP 진화 과정, ch15의 반복 개선 사이클 등 시간순/단계순 콘텐츠를 시각적으로 표현.

**동작 방식**:
- 세로 타임라인 (좌측에 점과 연결선)
- 각 노드에 제목 + 설명
- 현재 위치 하이라이트 가능
- 스크롤 시 순차적으로 나타나는 애니메이션 (선택적)

**구현 난이도**: 1/5

**MDX 사용 예시**:
```jsx
<Timeline current={1}>
  <TimelineItem title="점화" subtitle="Ch.0">
    왜 이걸 알아야 하는지 이해합니다
  </TimelineItem>
  <TimelineItem title="지도 그리기" subtitle="Ch.1~5">
    프로덕트가 뭘로 만들어지는지 해부합니다
  </TimelineItem>
  <TimelineItem title="직접 만들기" subtitle="Ch.6~10">
    실제로 도구를 쥐고 첫 프로덕트를 만듭니다
  </TimelineItem>
  <TimelineItem title="자유자재" subtitle="Ch.11~15">
    독립적으로 판단하고 반복하는 바이브코더가 됩니다
  </TimelineItem>
</Timeline>
```

**적합한 챕터**: ch00 (여정 미리보기), ch07 (MVP 진화), ch13 (Build Loop), ch15 (반복 개선)

---

## 4. 마이크로 인터랙션

### 4-1. 스크롤 기반 프로그레시브 리빌

**현재**: ReadingProgress 바가 있지만, 콘텐츠 자체의 시각적 리듬이 없음.

**제안**:
- 섹션이 뷰포트에 들어올 때 fade-in + 약간의 translate-y 애니메이션
- `IntersectionObserver` 기반, 한 번만 트리거 (재스크롤 시 반복 X)
- 성능: CSS transform + opacity만 사용 (layout/paint 트리거 없음)

**구현**: 전역 래퍼 컴포넌트 또는 MDX 헤딩 자동 래핑
**난이도**: 1/5

### 4-2. 코드 블록 개선

**현재**: rehype-pretty-code + shiki로 구문 강조. 기능적이지만 인터랙션 없음.

**제안**:
1. **복사 버튼**: 우측 상단에 "복사" 버튼 (클릭 시 클립보드에 복사 + 피드백)
2. **파일명 표시**: 코드 블록 상단에 파일 경로 배지
3. **라인 하이라이트**: 특정 라인을 강조하여 "이 줄이 핵심입니다" 표현
4. **단어 하이라이트**: 특정 단어에 배경색을 넣어 시선 유도

**난이도**: 2/5 (rehype-pretty-code 설정 + 커스텀 pre 컴포넌트)

### 4-3. 호버/포커스 인터랙션

**제안**:
- **용어 툴팁**: 전문 용어(프론트엔드, API, REST, CORS 등)에 호버하면 한 줄 정의 팝업. MDX에서 `<Term>` 컴포넌트로 감싸는 방식
- **외부 링크 프리뷰**: 외부 링크에 호버하면 제목 + 한 줄 설명 미리보기
- **테이블 행 호버**: 테이블 행에 호버 시 배경색 변경 (현재 없음)

**난이도**: 2/5

### 4-4. 챕터 간 네비게이션 개선

**현재**: NextPreview 컴포넌트가 텍스트 블록으로만 존재.

**제안**:
- **페이지 하단 카드형 네비게이션**: "이전 챕터 / 다음 챕터" 카드에 제목, 설명, 읽기 시간 표시
- **키보드 단축키**: 좌/우 화살표로 이전/다음 챕터 이동
- **진행률 연동**: 현재 읽기 진행률이 70% 이상이면 NextPreview를 더 눈에 띄게 표시

**난이도**: 2/5

---

## 5. 이미지/에셋 표시 컴포넌트

### 5-1. 이미지 전략 총괄

현재 이미지 0개는 심각한 문제다. 비개발자 대상 교육에서 시각 자료는 텍스트의 2~3배 효과를 낸다. 다만 "이미지를 넣자"가 아니라 **"어떤 종류의 이미지를 어떤 방식으로 보여줄 것인가"**가 핵심이다.

#### 이미지 유형별 제안

| 유형 | 설명 | 표시 방식 | 우선순위 |
|------|------|----------|---------|
| 개념 다이어그램 | 5가지 구성요소, 데이터 흐름 등 | InteractiveFlow 또는 Mermaid 확장 | 높음 |
| UI 스크린샷 | 브라우저 DevTools, Supabase, Vercel 등 | AnnotatedImage | 높음 |
| 비유 일러스트 | 식당 비유, 택배 비유 등 | 단순 Image + caption | 중간 |
| 비교 이미지 | 데모 vs 제품, 좋은 UI vs 나쁜 UI | BeforeAfterCompare | 중간 |
| 아이콘/로고 | 도구 로고 (Supabase, Vercel 등) | ToolMap 내 인라인 | 낮음 |

### 5-2. Figure (캡션 달린 이미지 컴포넌트)

**학습 효과**: 단순 `![alt](src)` 마크다운 이미지보다 의미론적으로 정확하고 시각적으로 일관됨.

**동작 방식**:
- `<figure>` + `<figcaption>` 시맨틱 마크업
- 이미지 최적화: `next/image` 활용 (lazy loading, 반응형 크기)
- 라이트박스: 클릭 시 전체 화면으로 확대
- 캡션 스타일 통일
- 다크 모드 대응: 배경이 흰 이미지에 자동 border 추가

**구현 난이도**: 1/5

**MDX 사용 예시**:
```jsx
<Figure
  src="/images/ch03-network-tab.png"
  alt="브라우저 Network 탭"
  caption="F12를 눌러 Network 탭을 열면 모든 API 요청을 추적할 수 있습니다"
  width={800}
/>
```

**적합한 챕터**: 모든 챕터

### 5-3. ImageCompare (이미지 비교 슬라이더)

**학습 효과**: 두 이미지(스크린샷)를 슬라이더로 좌우 비교. "변경 전후"를 보여줄 때 강력.

**동작 방식**:
- 두 이미지를 겹쳐 놓고 드래그 핸들로 분할선 이동
- 우측 이미지가 `clip-path`로 잘림
- 터치 지원 (모바일)

**구현 난이도**: 2/5

**MDX 사용 예시**:
```jsx
<ImageCompare
  before="/images/ch01-demo-app.png"
  after="/images/ch01-product-app.png"
  beforeLabel="데모 (빈 껍데기)"
  afterLabel="제품 (5가지 완성)"
/>
```

**적합한 챕터**: ch01 (데모 vs 제품), ch08 (로컬 vs 배포)

---

## 6. 구현 우선순위 로드맵

ROI(학습 효과 / 구현 비용)를 기준으로 3단계로 나눔.

### Phase 1: 즉시 효과, 최소 노력 (난이도 1~2)

| 순서 | 컴포넌트 | 난이도 | 적용 범위 | 이유 |
|------|---------|-------|----------|-----|
| 1 | **ProgressChecklist** | 1 | 전 챕터 | 졸업 테스트가 인터랙티브해짐. 가장 넓은 적용 범위 |
| 2 | **Tabs** | 1 | 5+ 챕터 | 기존 비교 테이블을 즉시 대체. 레이아웃 다양화 |
| 3 | **StepByStep** | 1 | 4+ 챕터 | 순차적 프로세스를 시각화. 기존 텍스트 나열 대체 |
| 4 | **Figure** | 1 | 전 챕터 | 이미지 추가의 기반. next/image 최적화 포함 |
| 5 | **TwoColumn** | 1 | 6+ 챕터 | 단일 컬럼 모노토니를 깸. CSS만으로 구현 |
| 6 | **Callout 확장** (danger, example 타입) | 1 | 전 챕터 | 기존 컴포넌트 미니 업데이트 |
| 7 | **BeforeAfterCompare** | 2 | 4+ 챕터 | 대비 콘텐츠에 강력한 효과 |
| 8 | **코드 블록 복사 버튼** | 2 | 전 챕터 | UX 기본 기능 |

### Phase 2: 높은 효과, 중간 노력 (난이도 2~3)

| 순서 | 컴포넌트 | 난이도 | 적용 범위 | 이유 |
|------|---------|-------|----------|-----|
| 9 | **DiagnosticQuiz** | 2 | 4+ 챕터 | 능동적 학습 도구. SelfCheck 보완 |
| 10 | **AnnotatedImage** | 2 | 5+ 챕터 | 스크린샷 활용의 핵심 |
| 11 | **LayerDiagram** | 2 | 3+ 챕터 | 핵심 개념(5가지 장기)의 인터랙티브 표현 |
| 12 | **SelfCheck 개선** (딜레이드 리빌, 입력란) | 2 | 전 챕터 | 기존 컴포넌트 대폭 강화 |
| 13 | **Timeline** | 1 | 3+ 챕터 | 여정 시각화 |
| 14 | **StickyAside** | 1 | 3+ 챕터 | 텍스트+다이어그램 동시 참조 |

### Phase 3: 킬러 피처, 높은 노력 (난이도 3)

| 순서 | 컴포넌트 | 난이도 | 적용 범위 | 이유 |
|------|---------|-------|----------|-----|
| 15 | **InteractiveFlow** | 3 | 3 챕터 | ch03의 킬러 피처. 데이터 여행을 눈으로 봄 |
| 16 | **ToolMap** | 3 | 3 챕터 | ch02의 킬러 피처. 도구-구성요소 연결 시각화 |
| 17 | **CodePlayground** | 3 | 4 챕터 | 코드와 친해지는 체험 도구 |

---

## 7. 기술적 고려사항

### "use client" 최소화 전략

- 인터랙션이 없는 컴포넌트 (Figure, TwoColumn, Timeline 레이아웃)는 서버 컴포넌트로 유지
- 인터랙션이 있는 컴포넌트 (SelfCheck, DiagnosticQuiz, InteractiveFlow 등)만 "use client"
- 무거운 라이브러리 (mermaid 등)는 dynamic import 유지

### 성능 예산

- Vercel free tier, 모바일 대응이 필수이므로:
  - 추가 npm 패키지는 최소화 (가능하면 CSS + vanilla JS로)
  - 이미지는 next/image + WebP/AVIF 자동 변환 활용
  - 인터랙티브 컴포넌트는 IntersectionObserver로 뷰포트 진입 시에만 활성화
  - 총 JS 번들 증가량 목표: Phase 1 전체에서 +20KB 이하 (gzipped)

### MDX 호환성

- 모든 컴포넌트는 mdxComponents.ts에 등록
- self-closing과 children 래핑 모두 지원
- prop 타입을 단순하게 유지 (string, number, boolean, 단순 배열/객체)
- 복잡한 데이터는 별도 JSON 파일로 분리 가능

### 다크 모드

- 모든 컴포넌트는 Tailwind `dark:` variant 대응 필수
- 이미지: 흰 배경 이미지에는 다크 모드에서 자동 border 추가
- 다이어그램: 텍스트/선 색상이 다크 모드에서도 가독성 유지

### 접근성

- 모든 인터랙티브 요소에 키보드 내비게이션 지원
- ARIA 레이블 필수
- 색상만으로 정보를 전달하지 않음 (아이콘 + 텍스트 병용)
- 애니메이션은 `prefers-reduced-motion` 미디어 쿼리로 비활성화 가능

---

## 8. 챕터별 적용 요약

| 챕터 | 현재 인터랙티브 요소 | 추가 권장 | 비고 |
|------|-------------------|----------|-----|
| ch00 | SelfCheck x2, Callout x3 | Timeline(여정), ProgressChecklist | 첫 인상이 중요 |
| ch01 | SelfCheck x2, Callout x3 | DiagnosticQuiz(10초 진단), LayerDiagram, BeforeAfterCompare, ProgressChecklist | 핵심 개념 챕터 |
| ch02 | SelfCheck x1, Callout x3, Mermaid x1 | ToolMap, LayerDiagram, Tabs(SQL/NoSQL), AnnotatedImage, ProgressChecklist | 가장 밀도 높은 챕터 |
| ch03 | SelfCheck x1, Callout x2, Mermaid x2 | InteractiveFlow(킬러), StepByStep(디버깅), AnnotatedImage(Network탭), ProgressChecklist | 데이터 흐름 시각화가 핵심 |
| ch04 | Mermaid x2 (추정) | InteractiveFlow(인증 흐름), AnnotatedImage(Supabase Auth), ProgressChecklist | 인증은 눈으로 봐야 이해됨 |
| ch05 | Mermaid x1 (추정) | ToolMap(외부서비스), Tabs(서비스별 비교), ProgressChecklist | 도구 매핑이 핵심 |
| ch06 | SelfCheck x2, Callout x3 | StepByStep(PRD 4단계), DiagnosticQuiz(기능 복잡도), StickyAside(PRD 템플릿), ProgressChecklist | 기획 프로세스 시각화 |
| ch07 | SelfCheck(추정), Callout | BeforeAfterCompare(전체 vs MVP), Timeline(MVP 진화), ProgressChecklist | 범위 결정 도구 |
| ch08 | Callout(추정) | StepByStep(배포 과정), AnnotatedImage(Vercel 대시보드), ProgressChecklist | 배포는 스크린샷 필수 |
| ch09 | Callout(추정) | ToolMap(도구 생태계), Tabs(도구 카테고리), ProgressChecklist | 도구 비교가 핵심 |
| ch10 | SelfCheck x2, Callout x4 | BeforeAfterCompare(프롬프트 비교), StepByStep(에러 리포트), CodePlayground(프롬프트 편집), ProgressChecklist | 실습 중심 |
| ch11 | Callout(추정) | BeforeAfterCompare(좋은 코드 vs 부채 코드), ProgressChecklist | 개념 이해 |
| ch12 | Callout(추정) | DiagnosticQuiz(프로젝트 선택), StepByStep(기획 프로세스), ProgressChecklist | 의사결정 도구 |
| ch13 | Callout(추정) | StepByStep(Build Loop), AnnotatedImage(터미널/브라우저), ProgressChecklist | 실전 가이드 |
| ch14 | Callout(추정) | StepByStep(배포 체크리스트), AnnotatedImage(배포 후 확인), ProgressChecklist | 런칭 프로세스 |
| ch15 | Callout(추정) | Timeline(반복 사이클), ProgressChecklist | 장기 관점 |

---

## 9. 핵심 설계 원칙 (요약)

1. **웹이니까 가능한 것에 집중**: 책에서도 할 수 있는 것(예쁜 박스, 색깔 강조)은 이미 하고 있음. 클릭, 드래그, 호버, 실시간 피드백, 상태 저장 -- 이것이 웹만의 가치
2. **능동적 학습 > 패시브 읽기**: 독자가 뭔가를 "하게" 만드는 모든 요소가 이해도를 높임
3. **점진적 공개(Progressive Disclosure)**: 모든 정보를 한 번에 쏟지 않고, 독자의 행동에 따라 공개
4. **1인 유지보수 가능성**: 모든 컴포넌트는 prop 기반 선언형, 상태는 localStorage만 사용, 서버 불필요
5. **성능 우선**: 추가 JS 최소화, CSS 애니메이션 우선, 뷰포트 기반 지연 로딩

---

*이 문서는 프론트엔드 인터랙션 전문가 에이전트가 프로젝트 코드베이스, 전체 콘텐츠 분석, 그리고 인터랙티브 교육 콘텐츠 설계 경험을 바탕으로 작성했습니다.*
