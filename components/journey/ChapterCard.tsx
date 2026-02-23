import Link from "next/link";

// 챕터 카드 컴포넌트 — 목록 페이지에서 각 챕터를 표시
interface ChapterCardProps {
  slug: string;
  chapterNumber: number;
  title: string;
  readingTime: number;
  description: string;
  isAvailable: boolean;
}

export default function ChapterCard({
  slug,
  chapterNumber,
  title,
  readingTime,
  description,
  isAvailable,
}: ChapterCardProps) {
  // 사용 불가 챕터: 클릭 불가 + 회색 처리
  if (!isAvailable) {
    return (
      <div
        className="
          flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50
          px-5 py-4 opacity-50
          dark:border-zinc-800 dark:bg-zinc-900/50
        "
      >
        {/* 챕터 번호 배지 */}
        <span className="mt-0.5 shrink-0 text-sm font-mono font-medium text-zinc-400 dark:text-zinc-600">
          Ch.{chapterNumber}
        </span>

        {/* 챕터 정보 */}
        <div className="min-w-0 flex-1">
          <p className="font-medium text-zinc-400 dark:text-zinc-600">
            {title || `Chapter ${chapterNumber}`}
          </p>
          <p className="mt-0.5 text-sm text-zinc-400 dark:text-zinc-600">준비 중</p>
        </div>
      </div>
    );
  }

  // 사용 가능 챕터: 링크 + 정보 표시
  return (
    <Link
      href={`/chapters/${slug}`}
      className="
        group flex items-start gap-4 rounded-lg border border-zinc-200 bg-white
        px-5 py-4 transition-colors
        hover:border-zinc-300 hover:bg-zinc-50
        dark:border-zinc-800 dark:bg-zinc-950
        dark:hover:border-zinc-700 dark:hover:bg-zinc-900
      "
    >
      {/* 챕터 번호 배지 */}
      <span className="mt-0.5 shrink-0 text-sm font-mono font-medium text-zinc-500 dark:text-zinc-400">
        Ch.{chapterNumber}
      </span>

      {/* 챕터 정보 */}
      <div className="min-w-0 flex-1">
        <p className="font-medium text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
          {title}
        </p>
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* 읽기 시간 */}
      <span className="mt-0.5 shrink-0 text-sm text-zinc-400 dark:text-zinc-500">
        {readingTime}분
      </span>
    </Link>
  );
}
