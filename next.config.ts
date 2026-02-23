import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next-mdx-remote v6 + Turbopack 호환
  transpilePackages: ["next-mdx-remote"],
  // Turbopack root 설정 — 상위 디렉토리 lockfile 경고 방지
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
