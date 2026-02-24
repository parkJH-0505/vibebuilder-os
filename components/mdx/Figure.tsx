// Figure — 이미지 + 캡션 래퍼 컴포넌트 (서버 컴포넌트)
// MDX에서 next/image를 시맨틱하게 사용하기 위한 래퍼
// Phase 2에서 AI 생성 이미지가 추가될 때 즉시 사용할 수 있는 기반

import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;  // 기본값: 800
  height?: number; // 기본값: 450
}

export function Figure({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: FigureProps) {
  return (
    <ScrollReveal>
      <figure className="not-prose my-8">
        {/* 이미지 래퍼 — 라운드, 보더, 그림자 처리 */}
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            // 반응형 최적화 — 모바일은 전체 너비, 데스크탑은 최대 800px
            sizes="(max-width: 768px) 100vw, 800px"
            // 일러스트/다이어그램도 고려하여 contain 사용
            className="w-full object-contain"
          />
        </div>

        {/* 캡션 — prop이 있을 때만 렌더링 */}
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
            {caption}
          </figcaption>
        )}
      </figure>
    </ScrollReveal>
  );
}
