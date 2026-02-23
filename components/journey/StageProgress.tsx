"use client";

// StageProgress — Stage별 진행률 바
// StageSection 헤더 아래, 챕터 카드 목록 위에 표시
// localStorage에서 완료 챕터를 읽어 진행률 계산

import { useEffect, useState } from "react";
import { getStageProgress } from "@/lib/progress";

interface StageProgressProps {
  stageId: number; // STAGES의 id (0~3)
}

export function StageProgress({ stageId }: StageProgressProps) {
  // SSR hydration mismatch 방지 — 초기값 0, 클라이언트에서 계산
  const [progressData, setProgressData] = useState<{
    completed: number;
    total: number;
    percent: number;
  }>({ completed: 0, total: 0, percent: 0 });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 클라이언트 마운트 후 localStorage에서 진행률 계산
    setProgressData(getStageProgress(stageId));
    setMounted(true);
  }, [stageId]);

  // SSR / 마운트 전: 레이아웃 자리만 차지 (깜빡임 방지)
  if (!mounted) {
    return (
      <div className="mt-3 mb-1 h-4" aria-hidden="true" />
    );
  }

  const { completed, total, percent } = progressData;

  // 진행 중인 챕터가 없는 Stage(total=0)는 표시 스킵
  if (total === 0) return null;

  return (
    <div className="mt-3 mb-1">
      {/* 진행률 텍스트 */}
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {completed}/{total} 완료
        </span>
        {percent === 100 && (
          <span className="text-xs font-medium text-green-600 dark:text-green-400">
            Stage 완료
          </span>
        )}
      </div>

      {/* 프로그레스 바 */}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Stage ${stageId} 진행률: ${completed}/${total} 완료`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${
            percent === 100
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
