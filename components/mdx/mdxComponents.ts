// MDX 컴포넌트 매핑 — compileMDX에 주입할 객체
// 이 파일을 lib/mdx.ts에서 import하여 기본 컴포넌트로 사용

import { SelfCheck } from "./SelfCheck";
import { ActionItem } from "./ActionItem";
import { KeyTakeaway } from "./KeyTakeaway";
import { NextPreview } from "./NextPreview";
import { Callout } from "./Callout";
import { Mermaid } from "./Mermaid";

// MDX 파일에서 <SelfCheck>, <ActionItem>, <Mermaid> 등으로 바로 사용 가능
export const mdxComponents = {
  SelfCheck,
  ActionItem,
  KeyTakeaway,
  NextPreview,
  Callout,
  Mermaid,
};
