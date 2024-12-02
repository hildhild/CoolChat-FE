import Header from "../components/Header/Header";
import Footer from "../components/Footer";

function DefaultLayout({ children }) {
  return (
    <div className="h-[100vh]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
