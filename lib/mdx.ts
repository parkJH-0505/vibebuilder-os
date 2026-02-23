import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { ChapterFrontmatter } from "./chapters";
import { mdxComponents } from "@/components/mdx/mdxComponents";

// MDX 컴파일 옵션 — rehype-pretty-code (Shiki) 포함
const rehypePrettyCodeOptions = {
  theme: "github-dark-default",
  keepBackground: true,
};

// ```mermaid 코드블록을 <Mermaid /> JSX로 변환하는 전처리기
// remark 플러그인 대신 문자열 레벨에서 처리 — 더 안정적
function preprocessMermaid(source: string): string {
  return source.replace(
    /```mermaid(?:\s+caption="([^"]*)")?\n([\s\S]*?)```/g,
    (_match, caption: string | undefined, code: string) => {
      // JSON.stringify로 이스케이프하면 MDX에서 안전하게 전달 가능
      const escaped = JSON.stringify(code.trim());
      if (caption) {
        return `<Mermaid chart={${escaped}} caption="${caption}" />`;
      }
      return `<Mermaid chart={${escaped}} />`;
    }
  );
}

// MDX 소스를 컴파일하여 content + frontmatter 반환
// 교육 컴포넌트(SelfCheck, ActionItem 등)를 기본으로 주입하며
// components 인자로 추가 오버라이드 가능
export async function compileMDXContent(
  source: string,
  components?: Record<string, React.ComponentType<any>>
) {
  const { content, frontmatter } = await compileMDX<ChapterFrontmatter>({
    source: preprocessMermaid(source),
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
      },
    },
    // 기본 교육 컴포넌트 + 호출부에서 전달한 컴포넌트로 오버라이드
    components: { ...mdxComponents, ...components },
  });

  return { content, frontmatter };
}
