// TwoColumn — 두 열 비교 레이아웃 컴포넌트 (서버 컴포넌트)
// 긍정/부정/중립 타입에 따라 배경색과 상단 보더가 달라지는 비교 블록
// 사용법: <TwoColumn leftTitle="..." rightTitle="..." leftType="negative" rightType="positive">
//           <Left>왼쪽 내용</Left>
//           <Right>오른쪽 내용</Right>
//         </TwoColumn>

import React from "react";

// 타입별 카드 스타일 매핑
const columnConfig = {
  positive: {
    cardClass:
      "border-t-2 border-t-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
    titleClass: "text-emerald-800 dark:text-emerald-200",
  },
  negative: {
    cardClass: "border-t-2 border-t-red-500 bg-red-50 dark:bg-red-900/20",
    titleClass: "text-red-800 dark:text-red-200",
  },
  neutral: {
    cardClass:
      "border-t-2 border-t-gray-300 bg-gray-50 dark:border-t-gray-600 dark:bg-gray-800",
    titleClass: "text-gray-700 dark:text-gray-300",
  },
} as const;

type ColumnType = keyof typeof columnConfig;

// Left / Right 는 단순 래퍼 — TwoColumn이 레이아웃을 제어하고,
// 이 컴포넌트들은 children을 div로 감싸기만 함
export function Left({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function Right({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

interface TwoColumnProps {
  leftTitle?: string;
  rightTitle?: string;
  leftType?: ColumnType; // 기본: neutral
  rightType?: ColumnType; // 기본: neutral
  children: React.ReactNode; // <Left>, <Right> 정확히 2개
}

export function TwoColumn({
  leftTitle,
  rightTitle,
  leftType = "neutral",
  rightType = "neutral",
  children,
}: TwoColumnProps) {
  // 서버 컴포넌트에서 children 배열 추출: [0] = Left, [1] = Right
  const childArray = React.Children.toArray(children);
  const leftContent = childArray[0];
  const rightContent = childArray[1];

  const leftConfig = columnConfig[leftType];
  const rightConfig = columnConfig[rightType];

  return (
    <div className="not-prose my-8">
      {/* 데스크탑: 2열 그리드 / 모바일: 단일 열로 스택 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* 왼쪽 열 */}
        <div className={`rounded-lg p-4 ${leftConfig.cardClass}`}>
          {leftTitle && (
            <p
              className={`mb-2 text-sm font-semibold ${leftConfig.titleClass}`}
            >
              {leftTitle}
            </p>
          )}
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {leftContent}
          </div>
        </div>

        {/* 오른쪽 열 */}
        <div className={`rounded-lg p-4 ${rightConfig.cardClass}`}>
          {rightTitle && (
            <p
              className={`mb-2 text-sm font-semibold ${rightConfig.titleClass}`}
            >
              {rightTitle}
            </p>
          )}
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {rightContent}
          </div>
        </div>
      </div>
    </div>
  );
}
