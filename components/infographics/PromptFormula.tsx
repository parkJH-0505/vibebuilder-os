// ch10 — 좋은 프롬프트 4요소 카드 그리드 인포그래픽
// 맥락 / 구체적 지시 / 제약 조건 / 기대 결과

// 4요소 카드 데이터 정의
const cards = [
  {
    emoji: "🎯",
    title: "맥락",
    description: "현재 프로젝트 상태, 사용 기술, 기존 코드 구조를 알려준다",
    color: {
      bar: "bg-indigo-500 dark:bg-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/30",
      border: "border-indigo-200 dark:border-indigo-700",
      icon: "bg-indigo-100 dark:bg-indigo-800/60 text-indigo-600 dark:text-indigo-300",
      title: "text-indigo-800 dark:text-indigo-200",
      desc: "text-indigo-600 dark:text-indigo-400",
    },
  },
  {
    emoji: "📋",
    title: "구체적 지시",
    description: "정확히 무엇을 해야 하는지 명시한다. 범위와 단계를 지정한다",
    color: {
      bar: "bg-emerald-500 dark:bg-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
      border: "border-emerald-200 dark:border-emerald-700",
      icon: "bg-emerald-100 dark:bg-emerald-800/60 text-emerald-600 dark:text-emerald-300",
      title: "text-emerald-800 dark:text-emerald-200",
      desc: "text-emerald-600 dark:text-emerald-400",
    },
  },
  {
    emoji: "🚧",
    title: "제약 조건",
    description: "하지 말아야 할 것, 건드리면 안 되는 것을 명시한다",
    color: {
      bar: "bg-amber-500 dark:bg-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/30",
      border: "border-amber-200 dark:border-amber-700",
      icon: "bg-amber-100 dark:bg-amber-800/60 text-amber-600 dark:text-amber-300",
      title: "text-amber-800 dark:text-amber-200",
      desc: "text-amber-600 dark:text-amber-400",
    },
  },
  {
    emoji: "✅",
    title: "기대 결과",
    description: "결과물의 형태를 명시한다. 코드? 설명? 플랜?",
    color: {
      bar: "bg-violet-500 dark:bg-violet-400",
      bg: "bg-violet-50 dark:bg-violet-900/30",
      border: "border-violet-200 dark:border-violet-700",
      icon: "bg-violet-100 dark:bg-violet-800/60 text-violet-600 dark:text-violet-300",
      title: "text-violet-800 dark:text-violet-200",
      desc: "text-violet-600 dark:text-violet-400",
    },
  },
];

export function PromptFormula() {
  return (
    <div className="not-prose my-8">
      {/* 1열(모바일) → 2열(sm) → 4열(lg) 반응형 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`
              rounded-xl border overflow-hidden flex flex-col
              ${card.color.bg} ${card.color.border}
            `}
          >
            {/* 상단 액센트 컬러 바 (3px) */}
            <div className={`h-[3px] w-full ${card.color.bar}`} />

            {/* 카드 본문 */}
            <div className="p-5 flex flex-col items-center text-center flex-1">
              {/* 큰 아이콘 영역 */}
              <div
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  text-3xl mb-4 mt-1
                  ${card.color.icon}
                `}
              >
                {card.emoji}
              </div>

              {/* 제목 */}
              <h3 className={`text-base font-bold mb-2 ${card.color.title}`}>
                {card.title}
              </h3>

              {/* 설명 */}
              <p className={`text-sm leading-relaxed ${card.color.desc}`}>
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
