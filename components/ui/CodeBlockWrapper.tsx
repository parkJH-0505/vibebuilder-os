"use client";

// CodeBlockWrapper — 코드 블록에 복사 버튼을 추가하는 래퍼
// mdxComponents.pre로 등록되어 <pre> 태그를 자동 래핑

import React, { useRef, useState, useCallback } from "react";

interface CodeBlockWrapperProps {
  children: React.ReactNode;
  [key: string]: unknown; // rehype-pretty-code가 추가하는 data-* 속성 전달
}

export function CodeBlockWrapper({ children, ...props }: CodeBlockWrapperProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const text = preRef.current?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 API 실패 시 무시
    }
  }, []);

  return (
    <div className="group/code relative">
      <pre ref={preRef} {...props}>
        {children}
      </pre>

      {/* 복사 버튼 — 코드 블록 우상단, hover 시 표시 */}
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md border border-zinc-600 bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300 opacity-0 transition-opacity hover:bg-zinc-700 group-hover/code:opacity-100"
        aria-label="코드 복사"
      >
        {copied ? (
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            복사됨
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            복사
          </span>
        )}
      </button>
    </div>
  );
}
