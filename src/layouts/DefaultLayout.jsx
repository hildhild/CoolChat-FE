import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ChatBox from "../components/ChatBox";

function DefaultLayout({ children }) {
  return (
    <div className="h-[100vh] relative overflow-x-hidden">
      <Header />
      {children}
      <Footer />
      <ChatBox/>
    </div>
  );
}

export default DefaultLayout;
