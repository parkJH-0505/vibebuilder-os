// ChapterHeader — 챕터 상단 헤더 컴포넌트 (서버 컴포넌트)
// 파트 정보, 챕터 제목, 설명, 읽기 시간을 표시

import type { ChapterFrontmatter } from "@/lib/chapters";

interface ChapterHeaderProps {
  frontmatter: ChapterFrontmatter;
}

export function ChapterHeader({ frontmatter }: ChapterHeaderProps) {
  return (
    <div className="mb-8">
      {/* 파트 정보 */}
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {frontmatter.part} · {frontmatter.partTitle}
      </p>

      {/* 제목 — frontmatter.title에 이미 "Ch.N"이 포함되어 있음 */}
      <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {frontmatter.title}
      </h1>

      {/* 설명 */}
      <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
        {frontmatter.description}
      </p>

      {/* 읽기 시간 */}
      <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500">
        읽기 시간 {frontmatter.readingTime}분
      </p>
    </div>
  );
}
