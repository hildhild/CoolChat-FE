import LandingContent from "./LandingContent";
import { DefaultLayout } from "../../layouts";
import CoolchatWidget from "./CoolchatWidget";

function Landing() {

  return (
    <DefaultLayout>
      <LandingContent />
      <CoolchatWidget/>
    </DefaultLayout>
  );
}

export default Landing;
