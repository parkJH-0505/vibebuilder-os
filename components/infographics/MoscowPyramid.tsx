// ch07 — MoSCoW 우선순위 역피라미드 인포그래픽
// Must → Should → Could → Won't, 위가 좁고 아래가 넓은 역피라미드

// 각 레이어 데이터 정의 (위에서 아래 순서)
const layers = [
  {
    emoji: "✅",
    label: "Must Have",
    description: "첫 버전에 반드시 포함",
    width: "w-1/2",        // 50%
    color: {
      bg: "bg-emerald-500 dark:bg-emerald-600",
      text: "text-white",
      desc: "text-emerald-100 dark:text-emerald-200",
    },
  },
  {
    emoji: "🟡",
    label: "Should Have",
    description: "1차 업데이트에 추가",
    width: "w-[65%]",      // 65%
    color: {
      bg: "bg-amber-400 dark:bg-amber-500",
      text: "text-white",
      desc: "text-amber-100 dark:text-amber-200",
    },
  },
  {
    emoji: "🔵",
    label: "Could Have",
    description: "여유 있을 때",
    width: "w-4/5",        // 80%
    color: {
      bg: "bg-blue-400 dark:bg-blue-500",
      text: "text-white",
      desc: "text-blue-100 dark:text-blue-200",
    },
  },
  {
    emoji: "⬜",
    label: "Won't Have",
    description: "MVP 이후",
    width: "w-[95%]",      // 95%
    color: {
      bg: "bg-gray-300 dark:bg-gray-600",
      text: "text-gray-700 dark:text-gray-200",
      desc: "text-gray-500 dark:text-gray-400",
    },
  },
];

export function MoscowPyramid() {
  return (
    <div className="not-prose my-8">
      <div className="flex gap-4 items-start">

        {/* 좌측 "← 줄여라" 화살표 레이블 */}
        <div className="hidden sm:flex flex-col items-center justify-center self-stretch py-2 gap-1">
          {/* 위쪽: 좁음 표시 */}
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium whitespace-nowrap">줄여라</span>
          {/* 세로 화살표 */}
          <div className="flex flex-col items-center flex-1">
            <span className="text-gray-400 dark:text-gray-500 text-sm">▲</span>
            <div className="flex-1 w-px bg-gray-300 dark:bg-gray-600 border-l-2 border-dashed border-gray-300 dark:border-gray-600" />
          </div>
        </div>

        {/* 피라미드 본체 */}
        <div className="flex-1 flex flex-col items-center gap-2">
          {layers.map((layer, index) => (
            <div
              key={layer.label}
              className={`
                ${layer.width} ${layer.color.bg}
                mx-auto rounded-lg px-4 py-3
                flex flex-row sm:flex-row items-center justify-between gap-2
                transition-all duration-200
              `}
            >
              {/* 이모지 + 라벨 */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base flex-shrink-0">{layer.emoji}</span>
                <span className={`text-sm font-bold ${layer.color.text} whitespace-nowrap`}>
                  {layer.label}
                </span>
              </div>

              {/* 설명 텍스트 */}
              <span className={`text-xs ${layer.color.desc} text-right hidden sm:block`}>
                {layer.description}
              </span>
            </div>
          ))}

          {/* 모바일용 설명 (바 외부) */}
          <div className="sm:hidden mt-2 space-y-1 w-full">
            {layers.map((layer) => (
              <div key={`desc-${layer.label}`} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{layer.emoji}</span>
                <span className="font-medium">{layer.label}:</span>
                <span>{layer.description}</span>
              </div>
            ))}
          </div>

          {/* 하단 "MVP 범위" 표시선 */}
          <div className="w-[65%] mt-1 flex flex-col items-center gap-1">
            <div className="w-full border-t-2 border-dashed border-emerald-400 dark:border-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ↑ MVP 범위
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
