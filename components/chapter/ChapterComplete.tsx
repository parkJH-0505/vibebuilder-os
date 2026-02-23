"use client";

// ChapterComplete — 챕터 완료 버튼 컴포넌트
// ChapterNav 바로 위에 표시
// 완료 상태를 localStorage에 저장하고 시각적으로 피드백

import { useEffect, useState } from "react";
import { isChapterComplete, markChapterComplete } from "@/lib/progress";

interface ChapterCompleteProps {
  slug: string; // 현재 챕터 slug
}

export function ChapterComplete({ slug }: ChapterCompleteProps) {
  // SSR hydration mismatch 방지 — 초기값은 false, 클라이언트에서 localStorage 확인
  const [completed, setCompleted] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false); // 방금 완료한 경우 애니메이션용

  useEffect(() => {
    // 클라이언트 마운트 후 localStorage에서 완료 여부 확인
    setCompleted(isChapterComplete(slug));
  }, [slug]);

  function handleComplete() {
    markChapterComplete(slug);
    setCompleted(true);
    setJustCompleted(true);

    // 2초 후 애니메이션 상태 초기화
    setTimeout(() => setJustCompleted(false), 2000);
  }

  return (
    <div className="my-8 rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
      <p className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        이 챕터를 완료했나요?
      </p>

      {completed ? (
        /* 완료 상태 */
        <div
          className={`flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 ${
            justCompleted ? "animate-pulse" : ""
          }`}
        >
          {/* 체크 아이콘 */}
          <svg
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          <span>{justCompleted ? "완료로 표시했습니다!" : "완료됨"}</span>
        </div>
      ) : (
        /* 미완료 상태 — 완료 버튼 */
        <button
          onClick={handleComplete}
          className="flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
          type="button"
        >
          {/* 빈 체크 아이콘 */}
          <svg
            className="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
          </svg>
          <span>완료로 표시</span>
        </button>
      )}
    </div>
  );
}
