import type { Metadata } from "next";
import { STAGES, SITE_NAME } from "@/lib/constants";
import { getAllChapterSlugs, getChapterSource } from "@/lib/chapters";
import { compileMDXContent } from "@/lib/mdx";
import StageSection, { type StageChapterData } from "@/components/journey/StageSection";

export const metadata: Metadata = {
  title: "학습 여정",
  description:
    "4단계 여정을 통해 비개발자에서 바이브코더로. 16챕터의 체계적인 학습 경로.",
};

// 챕터 prefix(ch00)로 실제 slug(ch00-why-now)를 찾는 유틸
// getAllChapterSlugs()는 파일명 기반 — prefix 일치 여부로 매핑
function findSlugByPrefix(existingSlugs: string[], prefix: string): string | null {
  return existingSlugs.find((slug) => slug.startsWith(prefix)) ?? null;
}

// 챕터 frontmatter를 읽어서 StageChapterData 반환
// MDX가 없는 챕터는 isAvailable: false로 반환
async function buildChapterData(
  chapterPrefix: string,
  existingSlugs: string[]
): Promise<StageChapterData> {
  const slug = findSlugByPrefix(existingSlugs, chapterPrefix);

  // 파일이 없는 경우 — "준비 중" 데이터 반환
  if (!slug) {
    // chapterNumber: "ch00" → 0, "ch12" → 12
    const chapterNumber = parseInt(chapterPrefix.replace("ch", ""), 10);
    return {
      slug: chapterPrefix,
      chapterPrefix,
      chapterNumber,
      title: "",
      readingTime: 0,
      description: "",
      isAvailable: false,
    };
  }

  // MDX frontmatter 파싱 — content는 사용하지 않음
  const source = getChapterSource(slug);
  const { frontmatter } = await compileMDXContent(source);

  return {
    slug,
    chapterPrefix,
    chapterNumber: frontmatter.chapterNumber,
    title: frontmatter.title,
    readingTime: frontmatter.readingTime,
    description: frontmatter.description,
    isAvailable: true,
  };
}

// 챕터 목록 페이지 — 서버 컴포넌트 (async)
// 4개 Stage를 순서대로 표시하고, 각 Stage 아래 챕터 카드를 나열
export default async function ChaptersPage() {
  const existingSlugs = getAllChapterSlugs();

  // 모든 Stage의 챕터 데이터를 병렬로 fetch
  const stagesWithChapters = await Promise.all(
    STAGES.map(async (stage) => {
      const chapters = await Promise.all(
        stage.chapters.map((prefix) => buildChapterData(prefix, existingSlugs))
      );
      return { stage, chapters };
    })
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* 페이지 헤더 */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">학습 여정</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          4단계 여정을 통해 바이브코더가 되어가는 과정입니다.
        </p>
      </div>

      {/* Stage 목록 */}
      <div className="space-y-12">
        {stagesWithChapters.map(({ stage, chapters }) => (
          <StageSection key={stage.id} stage={stage} chapters={chapters} />
        ))}
      </div>
    </div>
  );
}
