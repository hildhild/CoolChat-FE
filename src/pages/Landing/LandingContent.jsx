import SignUpSection from "./SignUpSection";
import PriceSection from "./PriceSection";
import FeatureSection from "./FeatureSection/FeatureSection";
import WelcomeSection from "./WelcomeSection/WelcomeSection";

function LandingContent() {
  return (
    <div>
      <WelcomeSection />
      <FeatureSection />
      <PriceSection />
      <SignUpSection />
    </div>
  );
}

export default LandingContent;
