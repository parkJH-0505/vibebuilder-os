"use client";

// Mermaid — 다이어그램 렌더링 컴포넌트 (클라이언트)
// MDX에서 두 가지 방식 지원:
//   1. <Mermaid chart="..." />  (prop)
//   2. <Mermaid>차트코드</Mermaid>  (children)
// mermaid 라이브러리를 동적 로드하여 SVG로 렌더링

import { useEffect, useRef, useState, type ReactNode } from "react";

interface MermaidProps {
  chart?: string;
  caption?: string;
  children?: ReactNode;
}

// children에서 텍스트를 추출하는 헬퍼
function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as any).props.children);
  }
  return "";
}

export function Mermaid({ chart, caption, children }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  // chart prop 또는 children에서 차트 코드 추출
  const chartCode = chart || extractText(children);

  useEffect(() => {
    if (!chartCode) return;
    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
          fontFamily: "Pretendard, sans-serif",
        });

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: rendered } = await mermaid.render(id, chartCode.trim());
        if (!cancelled) {
          setSvg(rendered);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "다이어그램 렌더링 실패"
          );
        }
      }
    }

    renderChart();
    return () => {
      cancelled = true;
    };
  }, [chartCode]);

  if (!chartCode) {
    return null;
  }

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
        <p className="font-semibold">다이어그램 렌더링 오류</p>
        <pre className="mt-2 overflow-x-auto text-xs">{error}</pre>
      </div>
    );
  }

  return (
    <figure className="not-prose my-8">
      <div
        ref={containerRef}
        className="flex justify-center overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
        dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
