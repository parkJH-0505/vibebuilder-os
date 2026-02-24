"use client";

// DiagnosticQuiz — 자가 진단 퀴즈 컴포넌트 (클라이언트 컴포넌트)
// 예/아니오 질문으로 독자의 현재 상태를 진단하고 결과 피드백 즉시 제공

import React, { useState, useCallback, useMemo } from "react";

// ─── 타입 정의 ────────────────────────────────────────────────────────────────

interface DiagnosticResult {
  range: [number, number]; // [최소, 최대] "예" 개수 범위
  label: string;           // 결과 라벨
  emoji: string;           // 결과 이모지
  message: string;         // 결과 상세 설명
}

interface DiagnosticQuizProps {
  title: string;                    // 퀴즈 제목
  questions: string[];              // 예/아니오 질문 배열
  results: DiagnosticResult[];      // 결과 매핑
  description?: string;             // 퀴즈 설명 (제목 아래)
}

// ─── 메인 컴포넌트 ──────────────────────────────────────────────────────────

export function DiagnosticQuiz({
  title,
  questions = [],
  results = [],
  description,
}: DiagnosticQuizProps) {
  const questionList = Array.isArray(questions) ? questions : [];
  const resultList = Array.isArray(results) ? results : [];

  // 각 질문 답변 상태: null = 미답변, true = 예, false = 아니오
  const [answers, setAnswers] = useState<(boolean | null)[]>(() =>
    Array(questionList.length).fill(null),
  );

  // 답변 핸들러
  const answer = useCallback((index: number, value: boolean) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  // 리셋 핸들러
  const reset = useCallback(() => {
    setAnswers(Array(questionList.length).fill(null));
  }, [questionList.length]);

  // 모든 질문에 답했는지
  const allAnswered = answers.length > 0 && answers.every((a) => a !== null);

  // "예" 개수 & 결과 매칭
  const yesCount = answers.filter((a) => a === true).length;
  const matchedResult = useMemo(() => {
    if (!allAnswered) return null;
    return resultList.find(
      (r) => yesCount >= r.range[0] && yesCount <= r.range[1],
    ) ?? null;
  }, [allAnswered, yesCount, resultList]);

  return (
    <div className="not-prose my-8">
      <div className="overflow-hidden rounded-lg border border-amber-200 bg-white dark:border-amber-800 dark:bg-zinc-900">
        {/* 헤더 */}
        <div className="border-b border-amber-200 bg-amber-50/50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/30">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="text-base">🔍</span>
            <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              {title}
            </span>
          </div>
          {description && (
            <p className="mt-1 text-xs text-amber-700/80 dark:text-amber-300/80">
              {description}
            </p>
          )}
        </div>

        {/* 질문 목록 */}
        <div className="divide-y divide-amber-100 dark:divide-amber-800/50">
          {questionList.map((q, index) => {
            const current = answers[index];
            return (
              <div key={index} className="px-4 py-3">
                {/* 질문 텍스트 */}
                <p className="mb-2 text-sm text-zinc-800 dark:text-zinc-200">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                    {index + 1}
                  </span>
                  {q}
                </p>

                {/* 예/아니오 버튼 */}
                <div className="flex gap-2 pl-7">
                  <button
                    type="button"
                    onClick={() => answer(index, true)}
                    className={`rounded-md border px-4 py-1.5 text-xs font-medium transition-all duration-150 ${
                      current === true
                        ? "border-emerald-500 bg-emerald-100 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-900/40 dark:text-emerald-200"
                        : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:bg-emerald-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30"
                    }`}
                  >
                    예
                  </button>
                  <button
                    type="button"
                    onClick={() => answer(index, false)}
                    className={`rounded-md border px-4 py-1.5 text-xs font-medium transition-all duration-150 ${
                      current === false
                        ? "border-red-400 bg-red-100 text-red-800 dark:border-red-500 dark:bg-red-900/40 dark:text-red-200"
                        : "border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:bg-red-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-red-700 dark:hover:bg-red-950/30"
                    }`}
                  >
                    아니오
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 결과 영역 */}
        {matchedResult && (
          <div className="border-t border-amber-200 bg-amber-50 px-4 py-4 dark:border-amber-800 dark:bg-amber-950/30">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">
                {matchedResult.emoji}
              </span>
              <div>
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                  {matchedResult.label}
                </p>
                <p className="mt-1 text-sm text-amber-800/90 dark:text-amber-200/90">
                  {matchedResult.message}
                </p>
              </div>
            </div>

            {/* 다시 하기 버튼 */}
            <button
              type="button"
              onClick={reset}
              className="mt-3 text-xs font-medium text-amber-600 underline underline-offset-2 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200"
            >
              다시 진단하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
