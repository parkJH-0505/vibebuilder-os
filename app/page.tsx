import { Hero } from "@/components/landing/Hero";
import { JourneyPreview } from "@/components/landing/JourneyPreview";
import { TargetAudience } from "@/components/landing/TargetAudience";
import { SocialProof } from "@/components/landing/SocialProof";
import { MetaBanner } from "@/components/landing/MetaBanner";

// 랜딩 페이지 (/)
// Navbar와 Footer는 layout.tsx에서 제공
export default function Home() {
  return (
    <div>
      <Hero />
      <JourneyPreview />
      <TargetAudience />
      <SocialProof />
      <MetaBanner />
    </div>
  );
}
