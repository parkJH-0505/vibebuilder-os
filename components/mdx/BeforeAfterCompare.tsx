// BeforeAfterCompare — Before/After 비교 레이아웃 컴포넌트 (서버 컴포넌트)
// 데스크탑: 가로 배치(Before → 화살표 → After), 모바일: 세로 스택

import React from "react";

// ─── 타입 정의 ────────────────────────────────────────────────────────────────

interface BeforeAfterCompareProps {
  beforeLabel?: string; // Before 카드 상단 라벨 (기본: "Before")
  afterLabel?: string;  // After 카드 상단 라벨 (기본: "After")
  children: React.ReactNode; // <Before>, <After> 정확히 2개
}

interface BeforeAfterItemProps {
  children: React.ReactNode;
}

// ─── Before / After 래퍼 컴포넌트 ────────────────────────────────────────────
// children만 그대로 렌더링하는 단순 래퍼.
// BeforeAfterCompare 내부에서 배열 인덱스로 구분하여 스타일을 입힘.

export function Before({ children }: BeforeAfterItemProps) {
  return <>{children}</>;
}

export function After({ children }: BeforeAfterItemProps) {
  return <>{children}</>;
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────

export function BeforeAfterCompare({
  beforeLabel = "Before",
  afterLabel = "After",
  children,
}: BeforeAfterCompareProps) {
  // children을 배열로 정규화하여 [0] = Before, [1] = After로 처리
  const items = React.Children.toArray(children);
  const beforeContent = items[0];
  const afterContent = items[1];

  return (
    <div className="not-prose my-8">
      {/*
        데스크탑(md 이상): 3열 그리드 — Before | 화살표 | After
        모바일: 단일 열 스택
      */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch">

        {/* Before 카드 */}
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          {/* Before 라벨 */}
          <p className="mb-2 text-sm font-semibold text-red-700 dark:text-red-300">
            {beforeLabel}
          </p>
          {/* Before 내용 */}
          <div className="text-sm">{beforeContent}</div>
        </div>

        {/* 화살표 — 데스크탑: → (가로), 모바일: ↓ (세로) */}
        <div className="flex items-center justify-center">
          {/* 데스크탑 화살표: md 이상에서만 표시 */}
          <span
            className="hidden text-2xl text-gray-400 md:flex md:items-center md:justify-center"
            aria-hidden="true"
          >
            →
          </span>
          {/* 모바일 화살표: md 미만에서만 표시 */}
          <span
            className="flex items-center justify-center text-2xl text-gray-400 md:hidden"
            aria-hidden="true"
          >
            ↓
          </span>
        </div>

        {/* After 카드 */}
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
          {/* After 라벨 */}
          <p className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            {afterLabel}
          </p>
          {/* After 내용 */}
          <div className="text-sm">{afterContent}</div>
        </div>

      </div>
    </div>
  );
}
