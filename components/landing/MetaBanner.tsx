import Link from "next/link";

// 메타 배너 섹션 — "이 사이트도 비개발자가 만들었습니다" 신뢰 메시지
// 배경색을 살짝 다르게 하여 섹션 리듬감 형성
// 서버 컴포넌트
export function MetaBanner() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-900 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* 메인 메시지 */}
        <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-snug">
          이 사이트도 비개발자가
          <br className="sm:hidden" />{" "}
          바이브코딩으로 만들었습니다.
        </p>

        {/* 기술 스택 서브 텍스트 */}
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Made with Claude Code + Next.js
        </p>

        {/* CTA 링크 */}
        <div className="mt-8">
          <Link
            href="/chapters/ch00-why-now"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
          >
            만든 과정 보기
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
