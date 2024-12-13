import Footer from "../components/Footer";
import { HeaderAuthen } from "../components";

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
