import { Footer } from "../../components";
import HeaderAuthen from "./HeaderAuthen/HeaderAuthen";

function AuthenLayout({ children }) {
  return (
    <div className="overflow-x-hidden relative">
      <HeaderAuthen />
      <div className="pt-16">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default AuthenLayout;
