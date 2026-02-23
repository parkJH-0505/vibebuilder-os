// 하단 푸터 — 서버 컴포넌트
export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
        <p>© 2026 Vibe Builder OS · 이 사이트도 바이브코딩으로 만들었습니다</p>
        <p>Made with Claude Code + Next.js</p>
      </div>
    </footer>
  );
}
