// ch15 — 피드백 해석 2x2 매트릭스 인포그래픽
// 빈도(x축) x 영향도(y축) 4분면

import { ScrollReveal } from "../ui/ScrollReveal";

// 각 셀 데이터 정의 (행 우선, 위에서 아래, 왼쪽에서 오른쪽)
// 행 0: 영향 높음 / 행 1: 영향 낮음
const cells = [
  // 1행: 영향 높음
  {
    row: 0,
    col: 0,
    title: "숨은 기회",
    action: "기록해두기",
    axis: "영향 높음 + 빈도 낮음",
    color: {
      bg: "bg-blue-100 dark:bg-blue-900/40",
      border: "border-blue-300 dark:border-blue-600",
      title: "text-blue-800 dark:text-blue-200",
      action: "text-blue-600 dark:text-blue-400",
      badge: "bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300",
    },
    isHighlight: false,
  },
  {
    row: 0,
    col: 1,
    title: "핵심 문제",
    action: "즉시 해결",
    axis: "영향 높음 + 빈도 높음",
    color: {
      bg: "bg-red-100 dark:bg-red-900/40",
      border: "border-red-500 dark:border-red-400",
      title: "text-red-800 dark:text-red-200",
      action: "text-red-600 dark:text-red-400",
      badge: "bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300",
    },
    isHighlight: true, // 우상단 강조 보더 2px
  },
  // 2행: 영향 낮음
  {
    row: 1,
    col: 0,
    title: "무시 가능",
    action: "나중에",
    axis: "영향 낮음 + 빈도 낮음",
    color: {
      bg: "bg-gray-100 dark:bg-gray-800/60",
      border: "border-gray-300 dark:border-gray-600",
      title: "text-gray-600 dark:text-gray-300",
      action: "text-gray-500 dark:text-gray-400",
      badge: "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
    },
    isHighlight: false,
  },
  {
    row: 1,
    col: 1,
    title: "불편 사항",
    action: "개선 대기",
    axis: "영향 낮음 + 빈도 높음",
    color: {
      bg: "bg-amber-100 dark:bg-amber-900/40",
      border: "border-amber-300 dark:border-amber-600",
      title: "text-amber-800 dark:text-amber-200",
      action: "text-amber-600 dark:text-amber-400",
      badge: "bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-300",
    },
    isHighlight: false,
  },
];

export function FeedbackMatrix() {
  return (
    <ScrollReveal>
      <div className="not-prose my-8">
        <div className="flex gap-3 items-stretch">

          {/* Y축 라벨 (세로 텍스트) */}
          <div className="flex flex-col items-center justify-center gap-1 py-2 flex-shrink-0">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 [writing-mode:vertical-rl] rotate-180 tracking-wider">
              영향 높음
            </span>
            <div className="flex-1 flex flex-col items-center gap-0.5">
              <div className="flex-1 w-px bg-gradient-to-b from-red-300 to-gray-300 dark:from-red-600 dark:to-gray-600" />
            </div>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 [writing-mode:vertical-rl] rotate-180 tracking-wider">
              영향 낮음
            </span>
          </div>

          {/* 매트릭스 본체 */}
          <div className="flex-1 flex flex-col gap-1">

            {/* 2x2 그리드 */}
            <div className="grid grid-cols-2 gap-1">
              {cells.map((cell) => (
                <div
                  key={`${cell.row}-${cell.col}`}
                  className={`
                    rounded-xl p-4 flex flex-col justify-between
                    min-h-[100px] sm:min-h-[120px]
                    ${cell.color.bg}
                    border-2 ${cell.isHighlight
                      ? "border-red-500 dark:border-red-400 shadow-sm shadow-red-200 dark:shadow-red-900"
                      : cell.color.border
                    }
                  `}
                >
                  {/* 셀 제목 */}
                  <div>
                    <h4 className={`text-sm sm:text-base font-bold ${cell.color.title}`}>
                      {cell.title}
                    </h4>
                    {/* 화살표 액션 */}
                    <p className={`text-xs sm:text-sm mt-0.5 ${cell.color.action}`}>
                      → {cell.action}
                    </p>
                  </div>

                  {/* 축 라벨 배지 (하단) */}
                  <div className={`
                    mt-2 text-xs px-2 py-0.5 rounded-full self-start hidden sm:block
                    ${cell.color.badge}
                  `}>
                    {cell.axis}
                  </div>
                </div>
              ))}
            </div>

            {/* X축 라벨 (하단) */}
            <div className="flex items-center justify-between mt-1 px-1">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                ← 빈도 낮음
              </span>
              <div className="flex-1 mx-2 h-px bg-gradient-to-r from-gray-300 to-red-300 dark:from-gray-600 dark:to-red-600" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                빈도 높음 →
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
