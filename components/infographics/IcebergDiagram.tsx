// ch01 — 카카오톡 빙산 다이어그램
// 수면 위 = 프론트엔드(바이브코딩이 만드는 것), 수면 아래 = API + 백엔드 + DB + 인프라

// 수면 위 항목
const aboveWater = [
  "메시지 입력창",
  "전송 버튼",
  "말풍선",
  "읽음 표시",
];

// 수면 아래 항목 (위에서 아래 순서)
const belowWater = [
  {
    emoji: "🔗",
    label: "API",
    desc: "주문서 전달 규격",
    indent: "ml-0",
    bg: "bg-blue-800/30 dark:bg-blue-800/50",
    border: "border-blue-600/40 dark:border-blue-500/50",
    text: "text-blue-200 dark:text-blue-100",
    desc_text: "text-blue-300/80 dark:text-blue-300",
  },
  {
    emoji: "⚙️",
    label: "백엔드",
    desc: "비즈니스 로직, 보안 검증",
    indent: "ml-4",
    bg: "bg-blue-900/30 dark:bg-blue-900/50",
    border: "border-blue-700/40 dark:border-blue-600/50",
    text: "text-blue-200 dark:text-blue-100",
    desc_text: "text-blue-300/80 dark:text-blue-300",
  },
  {
    emoji: "🗄️",
    label: "데이터베이스",
    desc: "데이터 저장, 조회",
    indent: "ml-8",
    bg: "bg-blue-950/30 dark:bg-blue-950/60",
    border: "border-blue-800/40 dark:border-blue-700/50",
    text: "text-blue-200 dark:text-blue-100",
    desc_text: "text-blue-300/80 dark:text-blue-300",
  },
  {
    emoji: "☁️",
    label: "인프라",
    desc: "서버, 도메인, 배포",
    indent: "ml-12",
    bg: "bg-slate-900/40 dark:bg-slate-900/60",
    border: "border-slate-700/40 dark:border-slate-600/50",
    text: "text-blue-200 dark:text-blue-100",
    desc_text: "text-blue-300/80 dark:text-blue-300",
  },
];

export function IcebergDiagram() {
  return (
    <div className="not-prose my-8">
      {/* 전체 컨테이너: 최대 너비 제한 후 가운데 정렬 */}
      <div className="mx-auto max-w-lg">

        {/* ─── 수면 위 영역 ─── */}
        <div className="rounded-t-2xl bg-sky-50 dark:bg-sky-950/30 border-2 border-b-0 border-sky-200 dark:border-sky-800 px-5 pt-5 pb-4">
          {/* 상단 라벨 */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-sky-500 dark:text-sky-400 uppercase tracking-wider">
              수면 위
            </span>
            <span className="text-xs text-sky-400 dark:text-sky-500 font-medium">
              바이브코딩이 만드는 것
            </span>
          </div>

          {/* 빙산 상단: 좁은 사다리꼴 형태를 mx-auto + 점진적 너비로 표현 */}
          <div className="flex flex-col items-center gap-2">
            {/* 프론트엔드 타이틀 배지 */}
            <div className="bg-sky-400 dark:bg-sky-500 text-white font-bold text-sm px-5 py-1.5 rounded-full shadow-sm">
              💻 프론트엔드
            </div>

            {/* 기능 목록: 좁은 너비에서 표시 */}
            <div className="flex flex-wrap justify-center gap-2 max-w-xs">
              {aboveWater.map((item) => (
                <span
                  key={item}
                  className="text-xs bg-white dark:bg-sky-900/50 border border-sky-200 dark:border-sky-700 text-sky-700 dark:text-sky-300 px-2.5 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─── 수면선 ─── */}
        <div className="relative bg-blue-200 dark:bg-blue-800 h-8 flex items-center justify-center overflow-hidden border-x-2 border-blue-300 dark:border-blue-700">
          {/* 물결 효과: 반복 텍스트 */}
          <span className="text-blue-400 dark:text-blue-500 text-xs font-medium tracking-[0.3em] select-none">
            〰〰〰 수면 〰〰〰
          </span>
          {/* 물결 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-100/40 to-blue-300/30 dark:from-sky-900/20 dark:to-blue-700/20 pointer-events-none" />
        </div>

        {/* ─── 수면 아래 영역 ─── */}
        <div className="rounded-b-2xl bg-blue-900/10 dark:bg-blue-950/40 border-2 border-t-0 border-blue-300/60 dark:border-blue-700 px-5 pt-4 pb-5">
          {/* 상단 라벨 */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-blue-400 dark:text-blue-400 uppercase tracking-wider">
              수면 아래
            </span>
            <span className="text-xs text-blue-400 dark:text-blue-500 font-medium">
              직접 채워야 하는 것
            </span>
          </div>

          {/* 수면 아래 항목: 아래로 갈수록 넓어지는 빙산 형태 */}
          <div className="flex flex-col gap-2">
            {belowWater.map((item, index) => {
              // 빙산 형태: index 0 = 가장 좁음(60%), index 3 = 전체(100%)
              const widths = ["w-[60%]", "w-[73%]", "w-[87%]", "w-full"];
              return (
                <div
                  key={item.label}
                  className={`
                    ${widths[index]} mx-auto
                    ${item.bg} border ${item.border}
                    rounded-lg px-3 py-2.5
                    flex items-center justify-between gap-2
                  `}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base flex-shrink-0">{item.emoji}</span>
                    <span className={`text-sm font-bold ${item.text} whitespace-nowrap`}>
                      {item.label}
                    </span>
                  </div>
                  <span className={`text-xs ${item.desc_text} text-right hidden sm:block`}>
                    {item.desc}
                  </span>
                </div>
              );
            })}

            {/* 모바일용 설명 텍스트 */}
            <div className="sm:hidden mt-2 space-y-1">
              {belowWater.map((item) => (
                <div key={`m-${item.label}`} className="flex items-center gap-1.5 text-xs text-blue-300/80 dark:text-blue-400">
                  <span>{item.emoji}</span>
                  <span className="font-medium text-blue-200 dark:text-blue-300">{item.label}:</span>
                  <span>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
