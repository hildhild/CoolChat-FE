import { Footer } from "../../components";
import HeaderAuthen from "./HeaderAuthen/HeaderAuthen";

function AuthenLayout({ children }) {
  return (
    <div className="overflow-x-hidden relative">
      <HeaderAuthen />
      {children}
      <Footer />
    </div>
  );
}

export default AuthenLayout;
