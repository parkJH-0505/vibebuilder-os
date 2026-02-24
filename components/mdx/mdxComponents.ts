// MDX 컴포넌트 매핑 — compileMDX에 주입할 객체
// 이 파일을 lib/mdx.ts에서 import하여 기본 컴포넌트로 사용

import { SelfCheck } from "./SelfCheck";
import { ActionItem } from "./ActionItem";
import { KeyTakeaway } from "./KeyTakeaway";
import { NextPreview } from "./NextPreview";
import { Callout } from "./Callout";
import { Mermaid } from "./Mermaid";
import { StepByStep, Step } from "./StepByStep";
import { Tabs, Tab } from "./Tabs";
import { TwoColumn, Left, Right } from "./TwoColumn";
import { Figure } from "./Figure";
import { BeforeAfterCompare, Before, After } from "./BeforeAfterCompare";
// Phase 2A 인포그래픽
import { JourneyRoadmap } from "../infographics/JourneyRoadmap";
import { IcebergDiagram } from "../infographics/IcebergDiagram";
import { RestaurantMapping } from "../infographics/RestaurantMapping";
import { MoscowPyramid } from "../infographics/MoscowPyramid";
import { PromptFormula } from "../infographics/PromptFormula";
import { TechDebtGraph } from "../infographics/TechDebtGraph";
import { BuilderCycle } from "../infographics/BuilderCycle";
import { FeedbackMatrix } from "../infographics/FeedbackMatrix";
// Phase 3 인터랙티브 컴포넌트
import { ProgressChecklist, CheckItem } from "./ProgressChecklist";
import { DiagnosticQuiz } from "./DiagnosticQuiz";
import { LayerDiagram } from "./LayerDiagram";
// Phase 4 폴리싱
import { CodeBlockWrapper } from "../ui/CodeBlockWrapper";
import { Term } from "./Term";

// MDX 파일에서 <SelfCheck>, <ActionItem>, <Mermaid> 등으로 바로 사용 가능
export const mdxComponents = {
  SelfCheck,
  ActionItem,
  KeyTakeaway,
  NextPreview,
  Callout,
  Mermaid,
  // Phase 1 신규 컴포넌트
  StepByStep,
  Step,
  Tabs,
  Tab,
  TwoColumn,
  Left,
  Right,
  Figure,
  BeforeAfterCompare,
  Before,
  After,
  // Phase 2A 인포그래픽
  JourneyRoadmap,
  IcebergDiagram,
  RestaurantMapping,
  MoscowPyramid,
  PromptFormula,
  TechDebtGraph,
  BuilderCycle,
  FeedbackMatrix,
  // Phase 3 인터랙티브
  ProgressChecklist,
  CheckItem,
  DiagnosticQuiz,
  LayerDiagram,
  // Phase 4 폴리싱
  pre: CodeBlockWrapper,
  Term,
};
