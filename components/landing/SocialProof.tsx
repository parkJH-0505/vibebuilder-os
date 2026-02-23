// 사회적 증거 섹션 — 페르소나 기반 공감 카드
// plan.md 페르소나(민준, 지현, 성민)의 핵심 고민을 인용 형태로 보여준다
// 서버 컴포넌트

const PROOF_CARDS = [
  {
    id: "minjun",
    quote: "UI는 30분 만에 만들었는데, 사용자 데이터 저장이 안 된다. Supabase를 연결하라는데 어떻게 하는지 모르겠다.",
    label: "스타트업 창업가, 32세",
  },
  {
    id: "jihyun",
    quote: "뭐가 프론트고 뭐가 백엔드인지 모르니까 어디서 막히는지도 모르겠다.",
    label: "마케팅 매니저, 35세",
  },
  {
    id: "sungmin",
    quote: "화면은 나왔는데 버튼 눌러도 아무것도 안 된다. 에러 메시지는 영어로 가득하다.",
    label: "사이드 프로젝터, 28세",
  },
] as const;

export function SocialProof() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-900 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
          이 여정을 시작한 사람들의 출발점
        </h2>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-12">
          Vibe Builder OS는 바로 이 고민에서 시작됩니다
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {PROOF_CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-6 py-5"
            >
              {/* 인용문 */}
              <blockquote className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                &ldquo;{card.quote}&rdquo;
              </blockquote>
              {/* 페르소나 레이블 */}
              <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
                &mdash; {card.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
