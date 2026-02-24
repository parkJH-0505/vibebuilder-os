// ch00 — 4단계 여정 로드맵 인포그래픽
// 아이디어 → 기획 → 구현 → 런칭 수평/수직 타임라인

// 각 단계 데이터 정의
const steps = [
  {
    emoji: "🌱",
    title: "아이디어",
    range: "Part 0~1",
    chapters: "Ch.0~5",
    color: {
      bg: "bg-emerald-100 dark:bg-emerald-900/40",
      border: "border-emerald-400 dark:border-emerald-500",
      icon: "bg-emerald-500 dark:bg-emerald-600",
      text: "text-emerald-700 dark:text-emerald-300",
      badge: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-400",
    },
  },
  {
    emoji: "📋",
    title: "기획",
    range: "Part 2",
    chapters: "Ch.6~7",
    color: {
      bg: "bg-blue-100 dark:bg-blue-900/40",
      border: "border-blue-400 dark:border-blue-500",
      icon: "bg-blue-500 dark:bg-blue-600",
      text: "text-blue-700 dark:text-blue-300",
      badge: "bg-blue-50 text-blue-600 dark:bg-blue-900/60 dark:text-blue-400",
    },
  },
  {
    emoji: "🔨",
    title: "구현",
    range: "Part 3~4",
    chapters: "Ch.8~13",
    color: {
      bg: "bg-amber-100 dark:bg-amber-900/40",
      border: "border-amber-400 dark:border-amber-500",
      icon: "bg-amber-500 dark:bg-amber-600",
      text: "text-amber-700 dark:text-amber-300",
      badge: "bg-amber-50 text-amber-600 dark:bg-amber-900/60 dark:text-amber-400",
    },
  },
  {
    emoji: "🚀",
    title: "런칭",
    range: "Part 5",
    chapters: "Ch.14~15",
    color: {
      bg: "bg-violet-100 dark:bg-violet-900/40",
      border: "border-violet-400 dark:border-violet-500",
      icon: "bg-violet-500 dark:bg-violet-600",
      text: "text-violet-700 dark:text-violet-300",
      badge: "bg-violet-50 text-violet-600 dark:bg-violet-900/60 dark:text-violet-400",
    },
  },
];

export function JourneyRoadmap() {
  return (
    <div className="not-prose my-8">
      {/* 데스크탑: 수평 타임라인 / 모바일: 수직 스택 */}
      <div className="relative flex flex-col md:flex-row items-stretch md:items-start gap-4 md:gap-0">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col md:flex-1 items-center relative">

            {/* 단계 카드 */}
            <div
              className={`
                w-full md:mx-2 rounded-xl border-2 p-4 flex flex-col items-center text-center
                ${step.color.bg} ${step.color.border}
              `}
            >
              {/* 원형 아이콘 */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-xl
                  ${step.color.icon} mb-2 shadow-sm
                `}
              >
                {step.emoji}
              </div>

              {/* 단계 번호 */}
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-0.5">
                STEP {index + 1}
              </span>

              {/* 단계명 */}
              <h3 className={`text-base font-bold mb-2 ${step.color.text}`}>
                {step.title}
              </h3>

              {/* Part / 챕터 배지 */}
              <div className="flex flex-col gap-1 items-center">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${step.color.badge}`}>
                  {step.range}
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${step.color.badge}`}>
                  {step.chapters}
                </span>
              </div>
            </div>

            {/* 연결선: 데스크탑은 오른쪽, 모바일은 아래 */}
            {index < steps.length - 1 && (
              <>
                {/* 데스크탑 연결선 (절대 위치로 카드 사이에 배치) */}
                <div className="hidden md:flex absolute top-5 -right-3 z-10 items-center">
                  <div className="w-6 border-t-2 border-dashed border-gray-300 dark:border-gray-600" />
                  <span className="text-gray-400 dark:text-gray-500 text-xs">▶</span>
                </div>

                {/* 모바일 연결선 (수직) */}
                <div className="flex md:hidden flex-col items-center my-1">
                  <div className="h-5 border-l-2 border-dashed border-gray-300 dark:border-gray-600" />
                  <span className="text-gray-400 dark:text-gray-500 text-xs leading-none">▼</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* 하단 전체 진행 바 */}
      <div className="mt-4 flex h-1.5 rounded-full overflow-hidden">
        <div className="flex-1 bg-emerald-400 dark:bg-emerald-500" />
        <div className="flex-1 bg-blue-400 dark:bg-blue-500" />
        <div className="flex-1 bg-amber-400 dark:bg-amber-500" />
        <div className="flex-1 bg-violet-400 dark:bg-violet-500" />
      </div>
    </div>
  );
}
