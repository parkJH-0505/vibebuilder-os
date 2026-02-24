// StepByStep — 단계별 절차 안내 컴포넌트 (서버 컴포넌트)
// CSS counter 기반 자동 넘버링. React.cloneElement 없이 동작하므로 RSC에서 안전
// 타임라인 선: violet 계열 (Callout의 emerald/amber/blue와 차별화)

import React from "react";
import { ScrollReveal } from "../ui/ScrollReveal";

// ─── Step (단일 단계) ────────────────────────────────────────────────────────

interface StepProps {
  title: string;
  children: React.ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    // [counter-increment:step] — 부모의 counter-reset:step에 종속되어 자동으로 1씩 증가
    // relative pb-8 — 타임라인 선이 이 영역 안에서 그려짐. 마지막 스텝은 pb-0으로 오버라이드
    <li className="relative flex gap-4 pb-8 last:pb-0 [counter-increment:step]">

      {/* ── 왼쪽: 인디케이터 + 타임라인 선 ───────────────────────── */}
      <div className="relative flex flex-col items-center">

        {/* 원형 번호 인디케이터 — CSS counter로 숫자 생성 */}
        {/*
          before:content-[counter(step)] : CSS counter 값을 텍스트로 렌더링
          z-10 : 타임라인 선 위에 위치
        */}
        <div
          className={[
            "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center",
            "rounded-full bg-violet-500 dark:bg-violet-600",
            "text-xs font-bold text-white",
            // CSS counter를 ::before pseudo로 렌더링
            "before:content-[counter(step)]",
          ].join(" ")}
          aria-hidden="true"
        />

        {/* 타임라인 세로 선 — 인디케이터 아래에서 다음 스텝 인디케이터까지 연결
            last:hidden : 마지막 스텝에서는 선을 숨겨 열린 끝선이 생기지 않게 함 */}
        <div
          className={[
            "mt-1 w-px grow",
            "bg-violet-300 dark:bg-violet-700",
            // 마지막 li에서는 연결선 불필요
            "last-of-type:hidden",
          ].join(" ")}
        />
      </div>

      {/* ── 오른쪽: 카드 콘텐츠 ──────────────────────────────────── */}
      {/*
        pb-1 : 카드와 다음 스텝 사이 약간의 여백
        min-w-0 : flex 자식의 텍스트 오버플로 방지
      */}
      <div className="min-w-0 flex-1 pb-1 pt-0.5">

        {/* 스텝 제목 */}
        <p className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </p>

        {/* 스텝 본문 */}
        <div className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {children}
        </div>
      </div>
    </li>
  );
}

// ─── StepByStep (래퍼) ───────────────────────────────────────────────────────

interface StepByStepProps {
  children: React.ReactNode; // <Step> 요소들
}

export function StepByStep({ children }: StepByStepProps) {
  return (
    <ScrollReveal>
      {/* not-prose : typography 플러그인의 스타일 간섭 차단 */}
      {/* [counter-reset:step] : 이 블록 안에서 step counter를 0으로 초기화 */}
      {/*   → 각 Step의 [counter-increment:step]이 1부터 시작 */}
      <div className="not-prose my-8">
        <ol className="flex flex-col [counter-reset:step]">
          {children}
        </ol>
      </div>
    </ScrollReveal>
  );
}
