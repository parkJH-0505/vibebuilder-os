// design.md 3-2 기반 — Stage 정의
export const STAGES = [
  {
    id: 0,
    name: "점화",
    emoji: "🔥",
    description: "왜 지금, 당신이, 이걸 알아야 하는가",
    milestone: '"이건 나한테도 해당되는 얘기구나"를 느낀다',
    chapters: ["ch00"],
    parts: ["Part 0"],
  },
  {
    id: 1,
    name: "지도 그리기",
    emoji: "🗺️",
    description: "프로덕트가 뭘로 만들어져 있는지 이해한다",
    milestone: "개발자와 대화할 수 있는 수준이 된다",
    chapters: ["ch01", "ch02", "ch03", "ch04", "ch05"],
    parts: ["Part 1"],
  },
  {
    id: 2,
    name: "직접 만들기",
    emoji: "🛠️",
    description: "도구를 쥐고 실제로 만들어보는 첫 사이클",
    milestone: "나만의 프로덕트를 배포해본 경험을 얻는다",
    chapters: ["ch06", "ch07", "ch08", "ch09", "ch10", "ch11"],
    parts: ["Part 2", "Part 3"],
  },
  {
    id: 3,
    name: "자유자재",
    emoji: "🚀",
    description: "독립적으로 판단하고 실행하는 바이브코더",
    milestone: "두 번째 프로덕트를 스스로 기획하고 만들 수 있다",
    chapters: ["ch12", "ch13", "ch14", "ch15"],
    parts: ["Part 4", "Part 5"],
  },
] as const;

export type StageId = (typeof STAGES)[number]["id"];

// Phase 0.5 이후 활성화할 유틸 — 현재는 항상 true 반환 (전체 공개)
export function isFreeChapter(stage: number): boolean {
  return true; // MVP: 전체 공개. Phase 0.5 데이터 후 stage <= 1로 변경 가능
}

export const SITE_NAME = "Vibe Builder OS";
export const SITE_DESCRIPTION =
  "비개발자를 위한 프로덕트 빌딩 완전 가이드 — 코딩 없이 프로덕트 구조를 이해하고 AI 시대의 판단력을 키운다";
export const SITE_URL = "https://vibebuilder.kr";
