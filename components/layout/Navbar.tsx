"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

// 상단 고정 네비게이션 바 — 모바일 햄버거 메뉴 포함
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* 텍스트 로고 */}
        <Link
          href="/"
          className="text-base font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          Vibe Builder OS
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden sm:flex items-center gap-4" aria-label="주요 메뉴">
          <Link
            href="/chapters"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            챕터 목록
          </Link>
          <ThemeToggle />
        </nav>

        {/* 모바일: 다크모드 토글 + 햄버거 */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            className="w-9 h-9 flex items-center justify-center rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {menuOpen ? (
              // X 아이콘
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // 햄버거 아이콘
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <nav
          className="sm:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3"
          aria-label="모바일 메뉴"
        >
          <Link
            href="/chapters"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            챕터 목록
          </Link>
        </nav>
      )}
    </header>
  );
}
