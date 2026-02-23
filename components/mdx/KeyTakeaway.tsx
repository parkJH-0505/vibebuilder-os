// KeyTakeaway — 챕터 핵심 요약 컴포넌트 (서버 컴포넌트)
// 챕터에서 기억해야 할 핵심 포인트를 강조하는 블록

interface KeyTakeawayProps {
  children: React.ReactNode;
  title?: string;
}

export function KeyTakeaway({ children, title = "이번 챕터 핵심" }: KeyTakeawayProps) {
  return (
    <div className="not-prose my-6 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-2 border-b border-blue-200 px-4 py-3 dark:border-blue-800">
        <span aria-hidden="true">📌</span>
        <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
          {title}
        </span>
      </div>

      {/* 본문 */}
      <div className="border-l-4 border-blue-400 px-4 py-4 text-sm text-blue-900 dark:border-blue-600 dark:text-blue-100">
        {children}
      </div>
    </div>
  );
}
