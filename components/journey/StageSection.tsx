import { STAGES } from "@/lib/constants";
import ChapterCard from "./ChapterCard";
import { StageProgress } from "./StageProgress";

// 챕터 데이터 타입 — 가용 여부 포함
export interface StageChapterData {
  slug: string;
  chapterPrefix: string; // "ch00", "ch01" 등 STAGES.chapters에 있는 값
  chapterNumber: number;
  title: string;
  readingTime: number;
  description: string;
  isAvailable: boolean;
}

// Stage 섹션 컴포넌트 — Stage 헤더 + 하위 챕터 카드 목록
interface StageSectionProps {
  stage: (typeof STAGES)[number];
  chapters: StageChapterData[];
}

export default function StageSection({ stage, chapters }: StageSectionProps) {
  return (
    <section>
      {/* Stage 헤더 */}
      <div className="border-b border-zinc-200 pb-3 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            {stage.emoji}
          </span>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Stage {stage.id}: {stage.name}
          </h2>
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{stage.description}</p>
        {/* 마일스톤 — 이 Stage를 마치면 도달하는 상태 */}
        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
          목표: {stage.milestone}
        </p>

        {/* Stage 진행률 바 — 완료 챕터 수 표시 */}
        <StageProgress stageId={stage.id} />
      </div>

      {/* 챕터 카드 목록 */}
      <div className="mt-4 space-y-2">
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.chapterPrefix}
            slug={chapter.slug}
            chapterNumber={chapter.chapterNumber}
            title={chapter.title}
            readingTime={chapter.readingTime}
            description={chapter.description}
            isAvailable={chapter.isAvailable}
          />
        ))}
      </div>
    </section>
  );
}
