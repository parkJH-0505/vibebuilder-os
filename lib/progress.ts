// lib/progress.ts — localStorage 기반 진도 추적 유틸리티
// SSR 환경에서도 안전하게 동작 (typeof window 체크 필수)

import { STAGES } from "@/lib/constants";

// 진도 데이터 구조
export interface ProgressData {
  completedChapters: string[]; // 완료된 챕터 full slug 목록 (예: "ch00-why-now")
  lastVisited: string | null; // 마지막으로 방문한 챕터 slug
  lastScrollPosition: Record<string, number>; // slug → 스크롤 퍼센트 (0~100)
}

const STORAGE_KEY = "vbo_progress";

const DEFAULT_PROGRESS: ProgressData = {
  completedChapters: [],
  lastVisited: null,
  lastScrollPosition: {},
};

// localStorage에서 진도 데이터 읽기
// SSR에서는 항상 기본값 반환
export function getProgress(): ProgressData {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<ProgressData>;

    // 누락된 필드를 기본값으로 보완 (구버전 데이터 호환)
    return {
      completedChapters: parsed.completedChapters ?? [],
      lastVisited: parsed.lastVisited ?? null,
      lastScrollPosition: parsed.lastScrollPosition ?? {},
    };
  } catch {
    // JSON 파싱 실패 시 기본값 반환
    return { ...DEFAULT_PROGRESS };
  }
}

// localStorage에 진도 데이터 저장
function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 저장 실패 (private mode 등) 시 무시
  }
}

// 챕터를 완료로 표시
// 이미 완료된 챕터면 중복 추가하지 않음
export function markChapterComplete(slug: string): void {
  const data = getProgress();
  if (!data.completedChapters.includes(slug)) {
    data.completedChapters = [...data.completedChapters, slug];
    saveProgress(data);
  }
}

// 챕터 완료 여부 확인
export function isChapterComplete(slug: string): boolean {
  const data = getProgress();
  return data.completedChapters.includes(slug);
}

// 마지막 방문 챕터 업데이트
export function updateLastVisited(slug: string): void {
  const data = getProgress();
  data.lastVisited = slug;
  saveProgress(data);
}

// 스크롤 위치 저장 (퍼센트, 0~100)
export function saveScrollPosition(slug: string, percent: number): void {
  const data = getProgress();
  data.lastScrollPosition = {
    ...data.lastScrollPosition,
    [slug]: Math.round(percent),
  };
  saveProgress(data);
}

// 특정 Stage의 진행률 계산
// STAGES의 chapters는 "ch00" prefix — completedChapters의 full slug와 startsWith로 매칭
export function getStageProgress(
  stageId: number
): { completed: number; total: number; percent: number } {
  const stage = STAGES.find((s) => s.id === stageId);
  if (!stage) return { completed: 0, total: 0, percent: 0 };

  const data = getProgress();
  // as const로 선언된 STAGES의 chapters.length는 literal type이므로 number로 캐스팅
  const total = stage.chapters.length as number;

  // prefix 매칭: "ch00" → "ch00-why-now" 같은 full slug를 찾음
  const completed = stage.chapters.filter((prefix) =>
    data.completedChapters.some((fullSlug) => fullSlug.startsWith(prefix))
  ).length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { completed, total, percent };
}
