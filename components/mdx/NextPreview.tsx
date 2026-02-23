// NextPreview — 다음 챕터 미리보기 컴포넌트 (서버 컴포넌트)
// 챕터 말미에 다음 챕터에서 배울 내용을 미리 소개하는 블록

interface NextPreviewProps {
  children: React.ReactNode;
}

export function NextPreview({ children }: NextPreviewProps) {
  return (
    <div className="not-prose my-6 rounded-lg border border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-2 border-b border-violet-200 px-4 py-3 dark:border-violet-800">
        <span aria-hidden="true">📖</span>
        <span className="text-sm font-semibold text-violet-800 dark:text-violet-200">
          다음 챕터 미리보기
        </span>
      </div>

      {/* 본문 */}
      <div className="border-l-4 border-violet-400 px-4 py-4 text-sm text-violet-900 dark:border-violet-600 dark:text-violet-100">
        {children}
      </div>
    </div>
  );
}
