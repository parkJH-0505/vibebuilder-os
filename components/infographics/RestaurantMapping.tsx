// ch01 — 식당 = 프로덕트 5요소 매핑
// 식당 비유와 IT 프로덕트 5요소의 1:1 대응 테이블

import { ScrollReveal } from "../ui/ScrollReveal";

// 매핑 데이터: 식당 ↔ IT
const mappings = [
  {
    restaurant: {
      emoji: "🍽️",
      label: "홀 인테리어",
      desc: "손님이 보고 경험하는 공간",
    },
    it: {
      emoji: "💻",
      label: "프론트엔드",
      desc: "사용자가 보고 클릭하는 화면",
    },
  },
  {
    restaurant: {
      emoji: "📝",
      label: "주문서 전달 규격",
      desc: "홀↔주방 소통 방식",
    },
    it: {
      emoji: "🔗",
      label: "API",
      desc: "프론트↔백엔드 소통 규격",
    },
  },
  {
    restaurant: {
      emoji: "👨‍🍳",
      label: "주방 + 매니저",
      desc: "요리 처리, 재고 확인, 품질 관리",
    },
    it: {
      emoji: "⚙️",
      label: "백엔드",
      desc: "비즈니스 로직, 보안 검증",
    },
  },
  {
    restaurant: {
      emoji: "📦",
      label: "창고 + 장부",
      desc: "식재료 보관, 판매 기록",
    },
    it: {
      emoji: "🗄️",
      label: "데이터베이스",
      desc: "데이터 저장, 조회",
    },
  },
  {
    restaurant: {
      emoji: "🏗️",
      label: "건물 + 전기/수도",
      desc: "영업을 가능하게 하는 기반",
    },
    it: {
      emoji: "☁️",
      label: "인프라",
      desc: "서버, 도메인, 배포",
    },
  },
];

export function RestaurantMapping() {
  return (
    <ScrollReveal>
      <div className="not-prose my-8">
      {/* 헤더 라벨 행 */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2 px-1">
        {/* 식당 헤더 */}
        <div className="flex-1 text-center">
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            식당 비유
          </span>
        </div>
        {/* 화살표 자리 공백 */}
        <div className="w-6 sm:w-8 flex-shrink-0" />
        {/* IT 헤더 */}
        <div className="flex-1 text-center">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            IT 프로덕트
          </span>
        </div>
      </div>

      {/* 매핑 행들 */}
      <div className="flex flex-col gap-2">
        {mappings.map((row, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-3">

            {/* 식당 카드 */}
            <div className="flex-1 min-w-0 flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700/50 rounded-xl px-3 py-2.5">
              <span className="text-lg sm:text-xl flex-shrink-0">{row.restaurant.emoji}</span>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-300 leading-tight">
                  {row.restaurant.label}
                </p>
                <p className="text-[10px] sm:text-xs text-amber-600/70 dark:text-amber-500 leading-snug hidden sm:block">
                  {row.restaurant.desc}
                </p>
              </div>
            </div>

            {/* 중간 화살표 */}
            <div className="flex-shrink-0 flex items-center justify-center w-6 sm:w-8">
              <span className="text-gray-400 dark:text-gray-500 font-bold text-sm sm:text-base">→</span>
            </div>

            {/* IT 카드 */}
            <div className="flex-1 min-w-0 flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-700/50 rounded-xl px-3 py-2.5">
              <span className="text-lg sm:text-xl flex-shrink-0">{row.it.emoji}</span>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-indigo-800 dark:text-indigo-300 leading-tight">
                  {row.it.label}
                </p>
                <p className="text-[10px] sm:text-xs text-indigo-600/70 dark:text-indigo-400 leading-snug hidden sm:block">
                  {row.it.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 모바일용 설명 보조 텍스트 */}
      <div className="sm:hidden mt-3 space-y-1.5">
        {mappings.map((row, index) => (
          <div key={`m-${index}`} className="flex flex-col gap-0.5 text-[10px] text-gray-400 dark:text-gray-500 px-1">
            <div className="flex gap-1">
              <span>{row.restaurant.emoji}</span>
              <span className="text-amber-600 dark:text-amber-500 font-medium">{row.restaurant.label}:</span>
              <span>{row.restaurant.desc}</span>
            </div>
            <div className="flex gap-1 pl-4">
              <span>{row.it.emoji}</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">{row.it.label}:</span>
              <span>{row.it.desc}</span>
            </div>
          </div>
        ))}
      </div>

      </div>
    </ScrollReveal>
  );
}
