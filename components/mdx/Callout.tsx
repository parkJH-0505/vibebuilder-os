// Callout — 팁/경고/정보 강조 박스 컴포넌트 (서버 컴포넌트)
// type에 따라 아이콘과 색상이 달라지는 범용 콜아웃 블록

// 타입별 스타일 매핑
const calloutConfig = {
  tip: {
    icon: "💡",
    label: "팁",
    containerClass:
      "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950",
    headerClass: "border-emerald-200 dark:border-emerald-800",
    labelClass: "text-emerald-800 dark:text-emerald-200",
    bodyClass:
      "border-emerald-400 text-emerald-900 dark:border-emerald-600 dark:text-emerald-100",
  },
  warning: {
    icon: "⚠️",
    label: "주의",
    containerClass:
      "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950",
    headerClass: "border-amber-200 dark:border-amber-800",
    labelClass: "text-amber-800 dark:text-amber-200",
    bodyClass:
      "border-amber-400 text-amber-900 dark:border-amber-600 dark:text-amber-100",
  },
  info: {
    icon: "ℹ️",
    label: "참고",
    containerClass:
      "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950",
    headerClass: "border-blue-200 dark:border-blue-800",
    labelClass: "text-blue-800 dark:text-blue-200",
    bodyClass:
      "border-blue-400 text-blue-900 dark:border-blue-600 dark:text-blue-100",
  },
} as const;

type CalloutType = keyof typeof calloutConfig;

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

export function Callout({ type = "info", children }: CalloutProps) {
  const config = calloutConfig[type];

  return (
    <div
      className={`not-prose my-6 rounded-lg border ${config.containerClass}`}
    >
      {/* 헤더 영역 */}
      <div
        className={`flex items-center gap-2 border-b px-4 py-3 ${config.headerClass}`}
      >
        <span aria-hidden="true">{config.icon}</span>
        <span className={`text-sm font-semibold ${config.labelClass}`}>
          {config.label}
        </span>
      </div>

      {/* 본문 */}
      <div className={`border-l-4 px-4 py-4 text-sm ${config.bodyClass}`}>
        {children}
      </div>
    </div>
  );
}
