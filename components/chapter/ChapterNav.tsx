// ChapterNav — 이전/다음 챕터 카드형 네비게이션 컴포넌트 (서버 컴포넌트)
// 챕터 본문 하단에 위치하며 이전/다음 챕터의 파트명과 제목을 함께 표시

import Link from "next/link";

interface AdjacentChapter {
  slug: string;
  title: string;
  part: string;
}

interface ChapterNavProps {
  prev: AdjacentChapter | null;
  next: AdjacentChapter | null;
}

export function ChapterNav({ prev, next }: ChapterNavProps) {
  // 이전/다음 모두 없으면 렌더링 스킵
  if (!prev && !next) return null;

  return (
    <nav
      className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-8 dark:border-zinc-800"
      aria-label="챕터 네비게이션"
    >
      {/* 이전 챕터 */}
      <div className="flex-1">
        {prev ? (
          <Link
            href={`/chapters/${prev.slug}`}
            className="group flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-3 text-sm transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/50"
          >
            {/* 왼쪽 화살표 */}
            <span
              className="text-zinc-400 transition-transform group-hover:-translate-x-0.5 dark:text-zinc-500"
              aria-hidden="true"
            >
              ←
            </span>
            <div className="text-left">
              <p className="text-xs text-zinc-400 dark:text-zinc-500">이전 챕터</p>
              {prev.part && (
                <p className="mt-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                  {prev.part}
                </p>
              )}
              <p className="font-medium text-zinc-700 dark:text-zinc-300">
                {prev.title}
              </p>
            </div>
          </Link>
        ) : (
          // 이전 챕터 없을 때 빈 공간 유지 (레이아웃 균형)
          <div />
        )}
      </div>

      {/* 가운데 여백 */}
      <div className="w-4 shrink-0" />

      {/* 다음 챕터 */}
      <div className="flex-1">
        {next ? (
          <Link
            href={`/chapters/${next.slug}`}
            className="group flex items-center justify-end gap-2 rounded-lg border border-zinc-200 px-4 py-3 text-sm transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/50"
          >
            <div className="text-right">
              <p className="text-xs text-zinc-400 dark:text-zinc-500">다음 챕터</p>
              {next.part && (
                <p className="mt-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                  {next.part}
                </p>
              )}
              <p className="font-medium text-zinc-700 dark:text-zinc-300">
                {next.title}
              </p>
            </div>
            {/* 오른쪽 화살표 */}
            <span
              className="text-zinc-400 transition-transform group-hover:translate-x-0.5 dark:text-zinc-500"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        ) : (
          // 다음 챕터 없을 때 빈 공간 유지
          <div />
        )}
      </div>
    </nav>
  );
}
