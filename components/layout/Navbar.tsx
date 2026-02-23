import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

// 상단 고정 네비게이션 바 — 서버 컴포넌트 (ThemeToggle만 클라이언트)
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* 텍스트 로고 */}
        <Link
          href="/"
          className="text-base font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          Vibe Builder OS
        </Link>

        {/* 우측 네비게이션 */}
        <nav className="flex items-center gap-4" aria-label="주요 메뉴">
          <Link
            href="/chapters"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            챕터 목록
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
