// ch15 — 빌더 성장 순환 사이클
// 상단 좌→우: 아이디어 → 기획 → 구현 → 런칭
// 하단 우→좌: 데이터 수집 → 학습/개선
// 우측 하강, 좌측 상승 화살표로 순환 연결

// 상단 행 (좌→우 순방향)
const topRow = [
  {
    emoji: "💡",
    label: "아이디어",
    color: {
      bg: "bg-amber-100 dark:bg-amber-900/40",
      border: "border-amber-300 dark:border-amber-600",
      text: "text-amber-700 dark:text-amber-300",
    },
  },
  {
    emoji: "📋",
    label: "기획",
    color: {
      bg: "bg-sky-100 dark:bg-sky-900/40",
      border: "border-sky-300 dark:border-sky-600",
      text: "text-sky-700 dark:text-sky-300",
    },
  },
  {
    emoji: "🔨",
    label: "구현",
    color: {
      bg: "bg-indigo-100 dark:bg-indigo-900/40",
      border: "border-indigo-300 dark:border-indigo-600",
      text: "text-indigo-700 dark:text-indigo-300",
    },
  },
  {
    emoji: "🚀",
    label: "런칭",
    color: {
      bg: "bg-violet-100 dark:bg-violet-900/40",
      border: "border-violet-300 dark:border-violet-600",
      text: "text-violet-700 dark:text-violet-300",
    },
  },
];

// 하단 행 (우→좌 역방향, 시각적 배치는 오른쪽부터)
const bottomRow = [
  {
    emoji: "📊",
    label: "데이터 수집",
    color: {
      bg: "bg-teal-100 dark:bg-teal-900/40",
      border: "border-teal-300 dark:border-teal-600",
      text: "text-teal-700 dark:text-teal-300",
    },
  },
  {
    emoji: "🔄",
    label: "학습/개선",
    color: {
      bg: "bg-emerald-100 dark:bg-emerald-900/40",
      border: "border-emerald-300 dark:border-emerald-600",
      text: "text-emerald-700 dark:text-emerald-300",
    },
  },
];

export function BuilderCycle() {
  return (
    <div className="not-prose my-8">
      <div className="mx-auto max-w-2xl">

        {/* ─── 상단 행: 아이디어 → 기획 → 구현 → 런칭 ─── */}
        <div className="flex items-center gap-1 sm:gap-2">
          {topRow.map((step, index) => (
            <div key={step.label} className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
              <div
                className={`
                  flex-1 min-w-0 flex flex-col items-center gap-1
                  ${step.color.bg} border ${step.color.border}
                  rounded-xl px-1 sm:px-3 py-2.5 sm:py-3 text-center
                `}
              >
                <span className="text-xl sm:text-2xl leading-none">{step.emoji}</span>
                <span className={`text-[11px] sm:text-sm font-semibold ${step.color.text} leading-tight`}>
                  {step.label}
                </span>
              </div>
              {index < topRow.length - 1 && (
                <span className="text-gray-400 dark:text-gray-500 text-sm sm:text-lg font-bold flex-shrink-0">→</span>
              )}
            </div>
          ))}
        </div>

        {/* ─── 중간 구역: 우측 하강 + 중앙 메시지 + 좌측 상승 ─── */}
        <div className="flex items-stretch my-1 sm:my-2 gap-1 sm:gap-2">

          {/* 좌측: 상승 화살표 (학습/개선 → 아이디어) */}
          <div className="flex flex-col items-center justify-center w-8 sm:w-12 flex-shrink-0">
            <div className="flex-1 w-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-gray-400 dark:text-gray-500 text-sm font-bold">↑</span>
          </div>

          {/* 중앙 핵심 메시지 */}
          <div className="flex-1 flex items-center justify-center py-1">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 sm:px-8 py-3 text-center shadow-sm">
              <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 leading-snug">
                반복할수록 빨라진다
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                매 사이클마다 판단이 빨라지고 실수가 줄어든다
              </p>
            </div>
          </div>

          {/* 우측: 하강 화살표 (런칭 → 데이터 수집) */}
          <div className="flex flex-col items-center justify-center w-8 sm:w-12 flex-shrink-0">
            <span className="text-gray-400 dark:text-gray-500 text-sm font-bold">↓</span>
            <div className="flex-1 w-px bg-gray-300 dark:bg-gray-600" />
          </div>
        </div>

        {/* ─── 하단 행: 학습/개선 ← 데이터 수집 (역방향, 오른쪽 정렬) ─── */}
        <div className="flex items-center gap-1 sm:gap-2">

          {/* 왼쪽 빈 공간: 상단 "아이디어", "기획" 위치와 시각적 맞춤 */}
          <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
            <div className="flex-1 min-h-[60px] sm:min-h-[68px] rounded-xl border border-dashed border-gray-200 dark:border-gray-700" />
            <span className="text-gray-300 dark:text-gray-700 text-sm sm:text-lg font-bold flex-shrink-0">←</span>
            <div className="flex-1 min-h-[60px] sm:min-h-[68px] rounded-xl border border-dashed border-gray-200 dark:border-gray-700" />
          </div>

          {/* 화살표 */}
          <span className="text-gray-400 dark:text-gray-500 text-sm sm:text-lg font-bold flex-shrink-0">←</span>

          {/* 하단 행 단계 카드들 (오른쪽에 위치) */}
          {bottomRow.map((step, index) => (
            <div key={step.label} className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
              <div
                className={`
                  flex-1 min-w-0 flex flex-col items-center gap-1
                  ${step.color.bg} border ${step.color.border}
                  rounded-xl px-1 sm:px-3 py-2.5 sm:py-3 text-center
                `}
              >
                <span className="text-xl sm:text-2xl leading-none">{step.emoji}</span>
                <span className={`text-[11px] sm:text-sm font-semibold ${step.color.text} leading-tight`}>
                  {step.label}
                </span>
              </div>
              {/* 두 카드 사이 화살표 */}
              {index < bottomRow.length - 1 && (
                <span className="text-gray-400 dark:text-gray-500 text-sm sm:text-lg font-bold flex-shrink-0">←</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
