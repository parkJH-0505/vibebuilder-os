"use client";

// SelfCheck — 생각해보기 아코디언 컴포넌트 (클라이언트 컴포넌트)
// details/summary 기반으로 JS 없이도 동작하며, CSS 애니메이션 지원

interface SelfCheckProps {
  question: string;
  children: React.ReactNode;
  hint?: string;
}

export function SelfCheck({ question, children, hint }: SelfCheckProps) {
  return (
    <div className="not-prose my-6 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-2 border-b border-amber-200 px-4 py-3 dark:border-amber-800">
        <span aria-hidden="true">🤔</span>
        <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
          잠깐, 생각해보세요
        </span>
      </div>

      {/* 질문 */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
          {question}
        </p>

        {/* 힌트 (선택) */}
        {hint && (
          <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
            힌트: {hint}
          </p>
        )}
      </div>

      {/* 펼치기/접기 아코디언 */}
      <details className="group px-4 pb-4">
        <summary className="cursor-pointer list-none">
          <div className="flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-200">
            <span className="transition-transform duration-200 group-open:rotate-90">
              ▶
            </span>
            <span className="group-open:hidden">펼쳐서 확인</span>
            <span className="hidden group-open:inline">접기</span>
          </div>
        </summary>

        {/* 답변/해설 내용 */}
        <div className="mt-3 rounded-md border border-amber-200 bg-white px-4 py-3 text-sm text-zinc-700 dark:border-amber-800 dark:bg-amber-900/30 dark:text-zinc-200">
          {children}
        </div>
      </details>
    </div>
  );
}
