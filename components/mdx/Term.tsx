// Term — 용어 툴팁 컴포넌트 (서버 컴포넌트)
// 전문 용어에 마우스 호버 시 짧은 정의를 CSS 툴팁으로 표시

interface TermProps {
  children: React.ReactNode; // 용어 텍스트
  def: string;               // 용어 정의 (툴팁으로 표시)
}

export function Term({ children, def }: TermProps) {
  return (
    <span className="term-tooltip group/term relative inline" data-tooltip={def}>
      <span className="cursor-help border-b border-dotted border-zinc-400 text-zinc-900 dark:border-zinc-500 dark:text-zinc-100">
        {children}
      </span>
      {/* CSS 툴팁 — hover 시 표시 */}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-normal rounded-md bg-zinc-800 px-3 py-2 text-xs leading-relaxed text-zinc-100 opacity-0 shadow-lg transition-opacity duration-200 group-hover/term:opacity-100 dark:bg-zinc-700 sm:w-56 w-48"
      >
        {def}
        {/* 화살표 */}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-800 dark:border-t-zinc-700" />
      </span>
    </span>
  );
}
