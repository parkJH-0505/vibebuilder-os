import type { Metadata } from "next";
import {
  getAllChapterSlugs,
  getChapterSource,
  getAdjacentChapters,
} from "@/lib/chapters";
import { compileMDXContent } from "@/lib/mdx";
import { SITE_URL } from "@/lib/constants";
import { ChapterHeader } from "@/components/chapter/ChapterHeader";
import { ChapterNav } from "@/components/chapter/ChapterNav";
import { ReadingProgress } from "@/components/chapter/ReadingProgress";
import { ChapterComplete } from "@/components/chapter/ChapterComplete";
import { notFound } from "next/navigation";

// 정적 생성 — 빌드 시 모든 챕터 경로 사전 생성
export async function generateStaticParams() {
  const slugs = getAllChapterSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// SEO — 챕터별 메타데이터 + OpenGraph
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getAllChapterSlugs();
  if (!slugs.includes(slug)) return {};

  const source = getChapterSource(slug);
  const { frontmatter } = await compileMDXContent(source);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      url: `${SITE_URL}/chapters/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const slugs = getAllChapterSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  // 현재 챕터 컴파일 (교육 컴포넌트 자동 포함)
  const source = getChapterSource(slug);
  const { content, frontmatter } = await compileMDXContent(source);

  // 이전/다음 챕터 (slug, title, part 포함)
  const { prev: adjPrev, next: adjNext } = getAdjacentChapters(slug);

  return (
    <>
      {/* 스크롤 진행률 바 — 네비바(64px) 아래에 고정 */}
      <ReadingProgress slug={slug} />

      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* 챕터 헤더 — 파트 정보, 제목, 설명, 읽기 시간 */}
        <ChapterHeader frontmatter={frontmatter} />

        {/* MDX 본문 — 교육 컴포넌트(SelfCheck, ActionItem 등) 자동 렌더링 */}
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          {content}
        </article>

        {/* 챕터 완료 버튼 — ChapterNav 바로 위 */}
        <ChapterComplete slug={slug} />

        {/* 이전/다음 챕터 네비게이션 */}
        <ChapterNav prev={adjPrev} next={adjNext} />
      </div>
    </>
  );
}
