import SignUpSection from "./SignUpSection";
import PriceSection from "./PriceSection";
import FeatureSection from "./FeatureSection/FeatureSection";
import WelcomeSection from "./WelcomeSection/WelcomeSection";
import { WorkSection } from "./WorkSection";

function LandingContent() {
  return (
    <div>
      <WelcomeSection />
      <FeatureSection />
      <PriceSection />
      <WorkSection />
      <SignUpSection />
    </div>
  );
}

export default LandingContent;
