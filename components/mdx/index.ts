// MDX 교육 컴포넌트 배럴 export
// MDX 파일에서 사용할 수 있는 커스텀 컴포넌트 목록

export { SelfCheck } from "./SelfCheck";
export { ActionItem } from "./ActionItem";
export { KeyTakeaway } from "./KeyTakeaway";
export { NextPreview } from "./NextPreview";
export { Callout } from "./Callout";
export { Mermaid } from "./Mermaid";
// Phase 1 신규 컴포넌트
export { StepByStep, Step } from "./StepByStep";
export { Tabs, Tab } from "./Tabs";
export { TwoColumn, Left, Right } from "./TwoColumn";
export { Figure } from "./Figure";
export { BeforeAfterCompare, Before, After } from "./BeforeAfterCompare";
// Phase 2A 인포그래픽
export { JourneyRoadmap } from "../infographics/JourneyRoadmap";
export { IcebergDiagram } from "../infographics/IcebergDiagram";
export { RestaurantMapping } from "../infographics/RestaurantMapping";
export { MoscowPyramid } from "../infographics/MoscowPyramid";
export { PromptFormula } from "../infographics/PromptFormula";
export { TechDebtGraph } from "../infographics/TechDebtGraph";
export { BuilderCycle } from "../infographics/BuilderCycle";
export { FeedbackMatrix } from "../infographics/FeedbackMatrix";

// MDX compileMDX에 주입할 컴포넌트 매핑 객체
// lib/mdx.ts에서 기본값으로 사용
export { mdxComponents } from "./mdxComponents";
