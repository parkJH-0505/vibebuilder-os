// 타깃 독자 소개 섹션 — 4개 카드 (2x2 그리드)
// 서버 컴포넌트

// 독자 카드 데이터
const AUDIENCE_CARDS = [
  {
    id: "idea-blocked",
    title: "아이디어는 있는데\n손이 묶여있는 분",
    description: "머릿속에 명확한 그림이 있지만, 어디서 어떻게 시작해야 할지 모르는 분",
  },
  {
    id: "dev-queue",
    title: "개발팀 대기열에서\n벗어나고 싶은 분",
    description: "매번 개발자에게 요청해야 하는 구조에서 벗어나 스스로 판단하고 실행하고 싶은 분",
  },
  {
    id: "ai-career",
    title: "AI 시대에 경력을\n차별화하고 싶은 분",
    description: "단순 기획자가 아닌, 프로덕트를 직접 만들 수 있는 사람으로 포지션을 바꾸고 싶은 분",
  },
  {
    id: "screen-idea",
    title: "머릿속 아이디어를\n화면에 꺼내고 싶은 분",
    description: "생각이 화면이 되는 경험을 해본 적 없지만, 그 경험을 원하는 분",
  },
] as const;

export function TargetAudience() {
  return (
    <section className="bg-white dark:bg-zinc-950 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* 섹션 제목 */}
        <h2 className="text-center text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-12">
          이런 분들이 읽고 있습니다
        </h2>

        {/* 2x2 그리드 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {AUDIENCE_CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-6 py-5 sm:px-7 sm:py-6"
            >
              {/* 카드 제목 — 줄바꿈 보존 */}
              <p className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50 whitespace-pre-line leading-snug">
                {card.title}
              </p>
              {/* 카드 설명 */}
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
