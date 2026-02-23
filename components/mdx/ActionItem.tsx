// ActionItem — 지금 바로 해볼 것 컴포넌트 (서버 컴포넌트)
// 챕터에서 독자가 즉시 실행해볼 수 있는 액션을 강조하는 블록

interface ActionItemProps {
  children: React.ReactNode;
}

export function ActionItem({ children }: ActionItemProps) {
  return (
    <div className="not-prose my-6 rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-2 border-b border-emerald-200 px-4 py-3 dark:border-emerald-800">
        <span aria-hidden="true">🎯</span>
        <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
          지금 바로 해볼 것
        </span>
      </div>

      {/* 본문 */}
      <div className="border-l-4 border-emerald-400 px-4 py-4 text-sm text-emerald-900 dark:border-emerald-600 dark:text-emerald-100">
        {children}
      </div>
    </div>
  );
}
