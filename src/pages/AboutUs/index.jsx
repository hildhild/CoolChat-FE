import { DefaultLayout } from "../../layouts";
import { Company } from "./Company";
import { Member } from "./Member";
import { Mission } from "./Mission";
import { useEffect } from "react";

export const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="mt-16 min-h-[100vh] overflow-x-hidden">
        <Company />
        <Mission />
        <Member />
      </div>
    </DefaultLayout>
  );
};
