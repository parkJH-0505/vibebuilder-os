"use client";

// ProgressChecklist — 졸업 테스트 인터랙티브 체크리스트 (클라이언트 컴포넌트)
// 각 챕터의 졸업 테스트를 클릭 가능한 체크박스로 변환, localStorage로 진행 상태 영속화

import React, { useState, useEffect, useCallback } from "react";

// ─── 타입 정의 ────────────────────────────────────────────────────────────────

interface ProgressChecklistProps {
  chapterId: string;          // localStorage 키 접두사 (예: "ch01")
  title?: string;             // 기본값: "졸업 테스트"
  children: React.ReactNode;  // <CheckItem> 요소들
}

interface CheckItemProps {
  children: React.ReactNode;  // 체크 항목 텍스트
  action?: boolean;           // true면 "즉시 실행" 강조 스타일
}

// ─── localStorage 헬퍼 ──────────────────────────────────────────────────────

const STORAGE_PREFIX = "vbos-progress-";

function loadChecked(chapterId: string, count: number): boolean[] {
  if (typeof window === "undefined") return Array(count).fill(false);
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + chapterId);
    if (!raw) return Array(count).fill(false);
    const parsed = JSON.parse(raw) as boolean[];
    // 배열 길이가 다르면 리셋 (항목 개수 변경 대응)
    if (parsed.length !== count) return Array(count).fill(false);
    return parsed;
  } catch {
    return Array(count).fill(false);
  }
}

function saveChecked(chapterId: string, checked: boolean[]) {
  try {
    localStorage.setItem(STORAGE_PREFIX + chapterId, JSON.stringify(checked));
  } catch {
    // localStorage 접근 실패 시 무시
  }
}

// ─── CheckItem 컴포넌트 ─────────────────────────────────────────────────────
// children만 렌더링하는 래퍼. ProgressChecklist 내부에서 인덱스로 제어.

export function CheckItem({ children }: CheckItemProps) {
  return <>{children}</>;
}

// ─── 메인 컴포넌트 ──────────────────────────────────────────────────────────

export function ProgressChecklist({
  chapterId,
  title = "졸업 테스트",
  children,
}: ProgressChecklistProps) {
  // children에서 CheckItem 배열 추출 (RSC serialization 안전)
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<CheckItemProps> =>
      React.isValidElement(child),
  );
  const count = items.length;

  // 체크 상태 — SSR 초기값은 모두 false (hydration 불일치 방지)
  const [checked, setChecked] = useState<boolean[]>(() => Array(count).fill(false));
  const [hydrated, setHydrated] = useState(false);

  // 마운트 시 localStorage에서 상태 복원
  useEffect(() => {
    setChecked(loadChecked(chapterId, count));
    setHydrated(true);
  }, [chapterId, count]);

  // 체크 토글 핸들러
  const toggle = useCallback(
    (index: number) => {
      setChecked((prev) => {
        const next = [...prev];
        next[index] = !next[index];
        saveChecked(chapterId, next);
        return next;
      });
    },
    [chapterId],
  );

  // 진행률 계산
  const doneCount = checked.filter(Boolean).length;
  const allDone = doneCount === count && count > 0;
  const percentage = count > 0 ? Math.round((doneCount / count) * 100) : 0;

  return (
    <div className="not-prose my-8">
      <div
        className={`overflow-hidden rounded-lg border transition-colors duration-300 ${
          allDone
            ? "border-teal-400 bg-teal-50 dark:border-teal-600 dark:bg-teal-950/40"
            : "border-teal-200 bg-white dark:border-teal-800 dark:bg-zinc-900"
        }`}
      >
        {/* 헤더 — 제목 + 진행률 */}
        <div className="flex items-center justify-between border-b border-teal-200 px-4 py-3 dark:border-teal-800">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="text-base">
              {allDone ? "🎉" : "📋"}
            </span>
            <span className="text-sm font-semibold text-teal-800 dark:text-teal-200">
              {allDone ? "챕터 완료!" : title}
            </span>
          </div>
          {/* 진행률 카운터 */}
          <span className="text-xs font-medium text-teal-600 dark:text-teal-400">
            {doneCount}/{count}
          </span>
        </div>

        {/* 진행률 바 */}
        <div className="h-1 bg-teal-100 dark:bg-teal-900/50">
          <div
            className="h-full bg-teal-500 transition-all duration-500 ease-out dark:bg-teal-400"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* 체크리스트 항목들 */}
        <ul className="divide-y divide-teal-100 dark:divide-teal-800/50">
          {items.map((item, index) => {
            const props = item.props ?? {};
            const isAction = props.action === true;
            const isChecked = checked[index] ?? false;

            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-teal-50/50 dark:hover:bg-teal-900/20 ${
                    isChecked ? "bg-teal-50/30 dark:bg-teal-950/20" : ""
                  }`}
                >
                  {/* 체크박스 */}
                  <span
                    className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all duration-200 ${
                      isChecked
                        ? "border-teal-500 bg-teal-500 text-white dark:border-teal-400 dark:bg-teal-400 dark:text-zinc-900"
                        : "border-gray-300 bg-white dark:border-zinc-600 dark:bg-zinc-800"
                    }`}
                  >
                    {isChecked && (
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>

                  {/* 라벨 텍스트 */}
                  <span
                    className={`text-sm leading-relaxed transition-all duration-200 ${
                      isChecked
                        ? "text-teal-600 line-through opacity-60 dark:text-teal-400"
                        : "text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {isAction && !isChecked && (
                      <span className="mr-1 inline-block text-xs" aria-hidden="true">
                        🔥
                      </span>
                    )}
                    {props.children}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* 완료 시 하단 메시지 */}
        {allDone && hydrated && (
          <div className="border-t border-teal-300 bg-teal-100/50 px-4 py-3 text-center text-sm font-medium text-teal-700 dark:border-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
            모든 항목을 확인했습니다! 다음 챕터로 넘어갈 준비가 되었어요.
          </div>
        )}
      </div>
    </div>
  );
}
