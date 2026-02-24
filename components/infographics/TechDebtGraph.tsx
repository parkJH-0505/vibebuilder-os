// ch11 — 기술 부채 누적 그래프
// 시간 경과에 따른 개발 속도 비교: 부채 무시(A, 빨강) vs 주기적 정리(B, 초록)

import { ScrollReveal } from "../ui/ScrollReveal";

export function TechDebtGraph() {
  return (
    <ScrollReveal>
      <div className="not-prose my-8">
      <div className="mx-auto max-w-xl">

        {/* SVG 차트 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <svg
            viewBox="0 0 420 260"
            className="w-full h-auto"
            aria-label="기술 부채 누적 그래프"
          >
            {/* ─── 배경 격자선 ─── */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-100 dark:text-gray-800" />
              </pattern>
            </defs>
            <rect x="40" y="10" width="360" height="200" fill="url(#grid)" />

            {/* ─── 축 ─── */}
            {/* y축 */}
            <line x1="40" y1="10" x2="40" y2="210" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 dark:text-gray-500" />
            {/* x축 */}
            <line x1="40" y1="210" x2="400" y2="210" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 dark:text-gray-500" />

            {/* x축 화살표 */}
            <polygon points="400,206 400,214 408,210" className="fill-gray-400 dark:fill-gray-500" />
            {/* y축 화살표 */}
            <polygon points="36,10 44,10 40,2" className="fill-gray-400 dark:fill-gray-500" />

            {/* ─── 축 라벨 ─── */}
            {/* x축: 시간 */}
            <text x="385" y="228" fontSize="11" className="fill-gray-500 dark:fill-gray-400" textAnchor="middle" fontWeight="500">시간 →</text>
            {/* y축: 개발 속도 */}
            <text x="14" y="115" fontSize="11" className="fill-gray-500 dark:fill-gray-400" textAnchor="middle" fontWeight="500" transform="rotate(-90, 14, 115)">개발 속도 ↑</text>

            {/* ─── 교차점 표시 영역 ─── */}
            {/* 두 곡선이 벌어지기 시작하는 지점(약 x=200) 수직 점선 */}
            <line x1="200" y1="15" x2="200" y2="210" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-gray-300 dark:text-gray-600" />

            {/* 교차점 주석 텍스트 (위쪽) */}
            <text x="205" y="30" fontSize="9.5" className="fill-gray-400 dark:fill-gray-500" fontStyle="italic">여기서부터</text>
            <text x="205" y="42" fontSize="9.5" className="fill-gray-400 dark:fill-gray-500" fontStyle="italic">차이가 벌어진다</text>
            <line x1="200" y1="44" x2="200" y2="55" stroke="currentColor" strokeWidth="1" className="text-gray-300 dark:text-gray-600" />

            {/* ─── A 곡선: "부채 무시" (빨강, 급격히 하락) ─── */}
            {/* 초반에 빠르다가 급격히 하락 */}
            <path
              d="M 50,45 C 110,42 165,55 200,90 C 235,125 270,165 370,215"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* A 곡선 끝 라벨 */}
            <circle cx="370" cy="215" r="4" fill="#ef4444" />

            {/* ─── B 곡선: "주기적 정리" (초록, 완만하게 유지) ─── */}
            {/* 초반에 살짝 느리지만 꾸준히 유지 */}
            <path
              d="M 50,58 C 110,60 165,68 200,75 C 250,84 300,85 370,82"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* B 곡선 끝 라벨 */}
            <circle cx="370" cy="82" r="4" fill="#22c55e" />

            {/* ─── 곡선 시작점 표시 ─── */}
            <circle cx="50" cy="45" r="3" fill="#ef4444" />
            <circle cx="50" cy="58" r="3" fill="#22c55e" />

            {/* ─── 범례 ─── */}
            {/* 배경 박스 */}
            <rect x="50" y="130" width="155" height="60" rx="6" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" className="text-gray-500 dark:text-gray-400" />

            {/* A 범례 */}
            <line x1="60" y1="150" x2="84" y2="150" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="72" cy="150" r="3" fill="#ef4444" />
            <text x="90" y="154" fontSize="11" className="fill-gray-700 dark:fill-gray-300" fontWeight="600">부채 무시</text>
            <text x="90" y="165" fontSize="9.5" className="fill-gray-400 dark:fill-gray-500">속도 급락, 유지보수 불가</text>

            {/* B 범례 */}
            <line x1="60" y1="180" x2="84" y2="180" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="72" cy="180" r="3" fill="#22c55e" />
            <text x="90" y="184" fontSize="11" className="fill-gray-700 dark:fill-gray-300" fontWeight="600">주기적 정리</text>
            <text x="90" y="195" fontSize="9.5" className="fill-gray-400 dark:fill-gray-500">속도 유지, 지속 가능</text>
          </svg>
        </div>

      </div>
      </div>
    </ScrollReveal>
  );
}
