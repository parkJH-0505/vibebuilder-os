// remark-mermaid — ```mermaid 코드블록을 <Mermaid> JSX로 변환하는 remark 플러그인
// MDX에서 일반 마크다운 코드블록으로 Mermaid 다이어그램 작성 가능

import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Code } from "mdast";

const remarkMermaid: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "code", (node: Code, index, parent) => {
      if (node.lang !== "mermaid" || !parent || index === undefined) return;

      // 코드블록의 메타(caption)를 추출 (```mermaid caption="..." 형태)
      const captionMatch = node.meta?.match(/caption="([^"]*)"/);
      const caption = captionMatch ? captionMatch[1] : undefined;

      // chart prop에 넣을 값: 작은따옴표와 큰따옴표를 이스케이프
      const escaped = node.value
        .replace(/\\/g, "\\\\")
        .replace(/`/g, "\\`")
        .replace(/\$/g, "\\$");

      // JSX 노드로 교체
      const jsxValue = caption
        ? `<Mermaid chart={\`${escaped}\`} caption="${caption}" />`
        : `<Mermaid chart={\`${escaped}\`} />`;

      (parent.children as any[])[index] = {
        type: "mdxJsxFlowElement" as any,
        name: "Mermaid",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "chart",
            value: node.value,
          },
          ...(caption
            ? [
                {
                  type: "mdxJsxAttribute",
                  name: "caption",
                  value: caption,
                },
              ]
            : []),
        ],
        children: [],
        data: { _mdxExplicitJsx: true },
      };
    });
  };
};

export default remarkMermaid;
