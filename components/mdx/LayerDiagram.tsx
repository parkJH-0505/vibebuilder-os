"use client";

// LayerDiagram — 5가지 구성요소 인터랙티브 다이어그램 (클라이언트 컴포넌트)
// 레이어를 클릭하면 상세 설명이 펼쳐지고, 식당/IT 모드를 토글할 수 있다

import React, { useState, useCallback } from "react";

// ─── 레이어 데이터 ──────────────────────────────────────────────────────────

interface Layer {
  id: string;
  icon: string;
  label: string;
  restaurant: string;
  restaurantIcon: string;
  description: string;
  tools: string[];
  colorClasses: {
    activeBorder: string;
    activeBg: string;
    activeText: string;
    badge: string;
    badgeText: string;
  };
}

const layers: Layer[] = [
  {
    id: "frontend",
    icon: "💻",
    label: "프론트엔드",
    restaurant: "홀 인테리어",
    restaurantIcon: "🍽️",
    description:
      "사용자가 직접 보고 만지는 화면. 버튼, 입력창, 이미지 배치, 페이지 이동 등 눈에 보이는 모든 것을 담당합니다.",
    tools: ["HTML/CSS", "React", "Next.js"],
    colorClasses: {
      activeBorder: "border-l-indigo-500 dark:border-l-indigo-400",
      activeBg: "bg-indigo-50/60 dark:bg-indigo-950/30",
      activeText: "text-indigo-700 dark:text-indigo-300",
      badge: "bg-indigo-100 dark:bg-indigo-900/50",
      badgeText: "text-indigo-700 dark:text-indigo-300",
    },
  },
  {
    id: "api",
    icon: "🔗",
    label: "API",
    restaurant: "주문서 전달 규격",
    restaurantIcon: "📝",
    description:
      "프론트엔드와 백엔드가 대화하는 약속된 방식. '이런 형식으로 요청하면, 이런 형식으로 응답한다'는 계약입니다.",
    tools: ["REST API", "GraphQL"],
    colorClasses: {
      activeBorder: "border-l-violet-500 dark:border-l-violet-400",
      activeBg: "bg-violet-50/60 dark:bg-violet-950/30",
      activeText: "text-violet-700 dark:text-violet-300",
      badge: "bg-violet-100 dark:bg-violet-900/50",
      badgeText: "text-violet-700 dark:text-violet-300",
    },
  },
  {
    id: "backend",
    icon: "⚙️",
    label: "백엔드",
    restaurant: "주방 + 매니저",
    restaurantIcon: "👨‍🍳",
    description:
      "데이터를 처리하고, 비즈니스 규칙을 실행하는 엔진. '이 사용자가 이 상품을 살 수 있는가?' 같은 판단을 합니다.",
    tools: ["Node.js", "Python", "Supabase Edge Functions"],
    colorClasses: {
      activeBorder: "border-l-emerald-500 dark:border-l-emerald-400",
      activeBg: "bg-emerald-50/60 dark:bg-emerald-950/30",
      activeText: "text-emerald-700 dark:text-emerald-300",
      badge: "bg-emerald-100 dark:bg-emerald-900/50",
      badgeText: "text-emerald-700 dark:text-emerald-300",
    },
  },
  {
    id: "database",
    icon: "🗄️",
    label: "데이터베이스",
    restaurant: "창고 + 장부",
    restaurantIcon: "📦",
    description:
      "모든 데이터를 저장하고 필요할 때 꺼내주는 저장소. 사용자 정보, 게시글, 주문 내역 등이 여기에 담깁니다.",
    tools: ["Supabase", "Firebase", "PlanetScale"],
    colorClasses: {
      activeBorder: "border-l-amber-500 dark:border-l-amber-400",
      activeBg: "bg-amber-50/60 dark:bg-amber-950/30",
      activeText: "text-amber-700 dark:text-amber-300",
      badge: "bg-amber-100 dark:bg-amber-900/50",
      badgeText: "text-amber-700 dark:text-amber-300",
    },
  },
  {
    id: "infra",
    icon: "☁️",
    label: "인프라",
    restaurant: "건물 + 전기",
    restaurantIcon: "🏗️",
    description:
      "프로덕트가 24시간 돌아가게 하는 기반 시설. 서버, 도메인, HTTPS 인증서, 배포 파이프라인 등을 관리합니다.",
    tools: ["Vercel", "AWS", "Cloudflare"],
    colorClasses: {
      activeBorder: "border-l-rose-500 dark:border-l-rose-400",
      activeBg: "bg-rose-50/60 dark:bg-rose-950/30",
      activeText: "text-rose-700 dark:text-rose-300",
      badge: "bg-rose-100 dark:bg-rose-900/50",
      badgeText: "text-rose-700 dark:text-rose-300",
    },
  },
];

// ─── 메인 컴포넌트 ──────────────────────────────────────────────────────────

type ViewMode = "restaurant" | "it";

export function LayerDiagram() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [mode, setMode] = useState<ViewMode>("restaurant");

  const toggleLayer = useCallback((id: string) => {
    setActiveLayer((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="not-prose my-8">
      <div className="overflow-hidden rounded-lg border border-indigo-200 bg-white dark:border-indigo-800 dark:bg-zinc-900">
        {/* 모드 토글 헤더 */}
        <div className="flex items-center border-b border-indigo-200 dark:border-indigo-800">
          <button
            type="button"
            onClick={() => setMode("restaurant")}
            className={`flex-1 px-4 py-2.5 text-center text-xs font-semibold transition-colors ${
              mode === "restaurant"
                ? "border-b-2 border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950/30 dark:text-indigo-300"
                : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            🍽️ 식당 모드
          </button>
          <button
            type="button"
            onClick={() => setMode("it")}
            className={`flex-1 px-4 py-2.5 text-center text-xs font-semibold transition-colors ${
              mode === "it"
                ? "border-b-2 border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950/30 dark:text-indigo-300"
                : "text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            💻 IT 모드
          </button>
        </div>

        {/* 레이어 스택 */}
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {layers.map((layer) => {
            const isActive = activeLayer === layer.id;
            const c = layer.colorClasses;

            return (
              <div key={layer.id}>
                {/* 레이어 행 — 클릭으로 토글 */}
                <button
                  type="button"
                  onClick={() => toggleLayer(layer.id)}
                  className={`flex w-full items-center gap-3 border-l-4 px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? `${c.activeBorder} ${c.activeBg}`
                      : "border-l-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {/* 아이콘 */}
                  <span className="text-lg" aria-hidden="true">
                    {mode === "restaurant" ? layer.restaurantIcon : layer.icon}
                  </span>

                  {/* 라벨 */}
                  <span
                    className={`flex-1 text-sm font-medium ${
                      isActive ? c.activeText : "text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {mode === "restaurant" ? (
                      <>
                        {layer.restaurant}
                        <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-500">
                          → {layer.label}
                        </span>
                      </>
                    ) : (
                      <>
                        {layer.label}
                        <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-500">
                          ({layer.restaurant})
                        </span>
                      </>
                    )}
                  </span>

                  {/* 펼침 화살표 */}
                  <svg
                    className={`h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform duration-200 ${
                      isActive ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* 펼침 영역 — 설명 + 도구 */}
                {isActive && (
                  <div className={`border-l-4 px-4 pb-4 pt-1 ${c.activeBorder} ${c.activeBg}`}>
                    <p className="mb-3 pl-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pl-8">
                      {layer.tools.map((tool) => (
                        <span
                          key={tool}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.badge} ${c.badgeText}`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 하단 안내 */}
        <div className="border-t border-zinc-100 bg-zinc-50/50 px-4 py-2 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
          각 구성요소를 클릭해서 자세히 살펴보세요
        </div>
      </div>
    </div>
  );
}
