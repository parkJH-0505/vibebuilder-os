"use client";

// SelfCheck — 딜레이드 리빌 방식 생각해보기 컴포넌트 (클라이언트 컴포넌트)
// "펼쳐서 확인" 클릭 → 2초 대기(thinking) → fade-in으로 답변 노출
// globals.css에 fadeIn 키프레임 정의 필요

import React, { useState, useCallback } from "react";

interface SelfCheckProps {
  question: string;
  children: React.ReactNode;
  hint?: string;
}

export function SelfCheck({ question, children, hint }: SelfCheckProps) {
  const [state, setState] = useState<"closed" | "thinking" | "revealed">("closed");

  const handleReveal = useCallback(() => {
    if (state === "closed") {
      setState("thinking");
      setTimeout(() => setState("revealed"), 2000);
    } else if (state === "revealed") {
      setState("closed");
    }
    // thinking 상태에서는 클릭 무시 (딜레이 진행 중)
  }, [state]);

  return (
    <div className="not-prose my-6 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-2 border-b border-amber-200 px-4 py-3 dark:border-amber-800">
        <span aria-hidden="true">🤔</span>
        <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
          잠깐, 생각해보세요
        </span>
      </div>

      {/* 질문 */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
          {question}
        </p>

        {/* 힌트 (선택) */}
        {hint && (
          <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
            힌트: {hint}
          </p>
        )}
      </div>

      {/* 펼치기/접기 버튼 */}
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={handleReveal}
          // thinking 중에는 비활성화하여 중복 클릭 방지
          disabled={state === "thinking"}
          className="flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-900 disabled:opacity-50 dark:text-amber-400 dark:hover:text-amber-200"
        >
          <span
            className={`transition-transform duration-200 ${
              state !== "closed" ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
          <span>{state === "closed" ? "펼쳐서 확인" : "접기"}</span>
        </button>

        {/* 딜레이 중 — 스스로 생각해보라는 메시지 */}
        {state === "thinking" && (
          <div className="mt-3 flex items-center gap-2 rounded-md border border-amber-200 bg-white px-4 py-3 dark:border-amber-800 dark:bg-amber-900/30">
            <span className="inline-block animate-spin text-sm" aria-hidden="true">
              ⏳
            </span>
            <span className="text-sm text-amber-700 dark:text-amber-300">
              잠시 스스로 생각해보세요...
            </span>
          </div>
        )}

        {/* 답변/해설 — fade-in으로 노출 */}
        {state === "revealed" && (
          <div className="mt-3 animate-[fadeIn_0.5s_ease-out] rounded-md border border-amber-200 bg-white px-4 py-3 text-sm text-zinc-700 dark:border-amber-800 dark:bg-amber-900/30 dark:text-zinc-200">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
