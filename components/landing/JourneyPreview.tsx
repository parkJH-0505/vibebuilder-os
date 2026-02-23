import { Fragment } from "react";
import { STAGES } from "@/lib/constants";

// 4-Stage 학습 여정 미리보기 섹션
// STAGES 데이터를 수평(모바일은 수직)으로 렌더링
// 서버 컴포넌트
export function JourneyPreview() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-900 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* 섹션 제목 */}
        <h2 className="text-center text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-12">
          4단계로 완성되는 바이브코더 여정
        </h2>

        {/* Stage 카드 + 화살표 레이아웃
            데스크탑(sm+): 수평 flex — 카드 flex-1, 화살표 고정폭
            모바일: 수직 flex-col — 카드 전체폭, 화살표 세로 */}
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-0">
          {STAGES.map((stage, index) => (
            <Fragment key={stage.id}>
              {/* Stage 카드 */}
              <div
                className="w-full sm:flex-1 flex flex-col items-center text-center px-4 py-5 sm:py-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
              >
                {/* 이모지 */}
                <span className="text-3xl sm:text-4xl" aria-hidden="true">
                  {stage.emoji}
                </span>

                {/* Stage 이름 */}
                <p className="mt-3 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {stage.name}
                </p>

                {/* 챕터 수 */}
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {stage.chapters.length}챕터
                </p>

                {/* Stage 설명 */}
                <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              {/* 화살표 구분자 — 마지막 아이템 이후에는 표시 안 함 */}
              {index < STAGES.length - 1 && (
                <div
                  className="flex items-center justify-center w-full sm:w-8 py-2 sm:py-0 text-zinc-300 dark:text-zinc-600 text-xl flex-shrink-0"
                  aria-hidden="true"
                >
                  {/* 모바일: 아래 방향 화살표, 데스크탑: 오른쪽 방향 화살표 */}
                  <span className="block sm:hidden">&#8595;</span>
                  <span className="hidden sm:block">&#8594;</span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
