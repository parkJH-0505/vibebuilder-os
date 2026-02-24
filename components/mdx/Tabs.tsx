"use client";

// Tabs / Tab — 탭 전환 컴포넌트 (클라이언트 컴포넌트)
// MDX에서 <Tabs><Tab label="...">내용</Tab></Tabs> 형태로 사용
// Tabs가 children의 props.label을 읽어 탭 바를 생성하고, activeTab 상태로 콘텐츠를 전환

import { useState } from "react";
import React from "react";

// Tab 컴포넌트 — 단순 래퍼. Tabs 부모가 props를 직접 읽으므로 자체 렌더링 로직 없음
interface TabProps {
  label: string;
  children: React.ReactNode;
}

export function Tab({ children }: TabProps) {
  // 이 컴포넌트는 단독으로 렌더링되지 않음.
  // Tabs에서 children으로 콘텐츠를 추출하여 렌더링하는 방식
  return <>{children}</>;
}

// Tabs 컴포넌트 — 탭 바 + 콘텐츠 영역 통합 관리
interface TabsProps {
  children: React.ReactNode; // <Tab> 요소들
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0); // 첫 번째 탭이 기본 활성

  // children을 배열로 변환하여 순회 가능하게 만들기
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];

  return (
    <div className="not-prose my-8 rounded-lg border border-zinc-200 dark:border-zinc-700">
      {/* 탭 바 — 밑줄 인디케이터 방식 */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-700">
        {tabs.map((tab, index) => {
          const isActive = index === activeTab;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={[
                // 공통 스타일
                "px-4 py-3 text-sm transition-colors duration-150",
                "border-b-2 -mb-px", // 밑줄 인디케이터 (탭 바 border 위에 겹침)
                // 활성/비활성 상태에 따른 분기
                isActive
                  ? "border-indigo-600 font-semibold text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent font-normal text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              ].join(" ")}
              aria-selected={isActive}
              role="tab"
            >
              {tab.props.label}
            </button>
          );
        })}
      </div>

      {/* 탭 콘텐츠 영역 — 활성 탭의 children만 렌더링 */}
      <div className="px-5 py-4 text-sm text-zinc-700 dark:text-zinc-300">
        {tabs[activeTab]}
      </div>
    </div>
  );
}
