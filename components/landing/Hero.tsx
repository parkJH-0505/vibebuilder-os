import Link from "next/link";

// Hero 섹션 — 랜딩 페이지 최상단 메인 카피와 CTA
// 서버 컴포넌트
export function Hero() {
  return (
    <section className="bg-white dark:bg-zinc-950 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* 메인 헤드라인 */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
          코딩 없이 프로덕트를 만든다는 것의
          <br className="hidden sm:block" />
          <span className="text-blue-500"> 진짜 의미</span>
        </h1>

        {/* 서브 카피 */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          도구 사용법이 아니라, 지도 읽는 법을 배웁니다
        </p>

        {/* 스펙 라인 */}
        <p className="mt-4 text-sm sm:text-base text-zinc-400 dark:text-zinc-500">
          16챕터 &middot; 약 10시간 &middot; 비개발자 관점 100%
        </p>

        {/* CTA 버튼 */}
        <div className="mt-10">
          <Link
            href="/chapters"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-7 py-3.5 text-base font-semibold text-white transition-colors"
          >
            시작하기
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
