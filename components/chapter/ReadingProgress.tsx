"use client";

// ReadingProgress — 스크롤 기반 진행률 바
// 네비바(h-16 = 64px) 바로 아래에 고정 표시
// passive 이벤트 리스너로 성능 최적화

import { useEffect, useState } from "react";
import { saveScrollPosition } from "@/lib/progress";

interface ReadingProgressProps {
  slug: string; // 현재 챕터 slug — 스크롤 위치 저장에 사용
}

export function ReadingProgress({ slug }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 스크롤 퍼센트 계산
    // (scrollY) / (전체 스크롤 가능 높이) × 100
    function calculateProgress(): number {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (docHeight <= 0) return 0;
      return Math.min(100, Math.round((scrollTop / docHeight) * 100));
    }

    function handleScroll() {
      const percent = calculateProgress();
      setProgress(percent);

      // 스크롤 위치 localStorage에 저장 (throttle 없이 — 가벼운 연산)
      saveScrollPosition(slug, percent);
    }

    // 초기값 설정 (페이지 로드 시 스크롤이 이미 있을 수 있음)
    setProgress(calculateProgress());

    // passive: true — 스크롤 성능 최적화 (preventDefault 호출 없음을 브라우저에 알림)
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug]);

  return (
    <div
      className="fixed left-0 right-0 z-40 h-[3px] bg-zinc-200 dark:bg-zinc-800"
      style={{ top: "64px" }} // 네비바 h-16 = 64px
      aria-hidden="true"
    >
      <div
        className="h-full bg-blue-500 transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
