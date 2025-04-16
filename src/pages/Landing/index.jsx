import LandingContent from "./LandingContent";
import { DefaultLayout } from "../../layouts";
import CoolchatWidget from "./CoolchatWidget";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Landing() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      if (location.state.scrollTo !== "/") {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: "smooth",
          });
        }
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  return (
    <DefaultLayout>
      <LandingContent />
      <CoolchatWidget />
    </DefaultLayout>
  );
}

export default Landing;
