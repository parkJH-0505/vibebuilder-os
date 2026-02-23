import fs from "fs";
import path from "path";
import { STAGES } from "./constants";

// 챕터 frontmatter 타입 — design.md 3-1 기반
export interface ChapterFrontmatter {
  title: string;
  slug: string;
  chapterNumber: number;
  part: string;
  partTitle: string;
  stage: number;
  readingTime: number;
  prerequisites: string[];
  description: string;
  keyTakeaways: string[];
  nextPreview: string;
  actionItem: string;
}

export interface ChapterMeta {
  slug: string;
  title: string;
  chapterNumber: number;
  part: string;
  partTitle: string;
  stage: number;
  readingTime: number;
  description: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "chapters");

// MDX 파일 목록에서 slug 추출
export function getAllChapterSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

// 특정 챕터의 원본 MDX 문자열 읽기
export function getChapterSource(slug: string): string {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  return fs.readFileSync(filePath, "utf-8");
}

// slug로 이전/다음 챕터 찾기
export function getAdjacentChapters(slug: string) {
  const slugs = getAllChapterSlugs();
  const index = slugs.indexOf(slug);
  return {
    prev: index > 0 ? slugs[index - 1] : null,
    next: index < slugs.length - 1 ? slugs[index + 1] : null,
  };
}

// slug가 속한 Stage 찾기
export function getStageForChapter(slug: string) {
  return STAGES.find((s) => (s.chapters as readonly string[]).includes(slug)) ?? null;
}
