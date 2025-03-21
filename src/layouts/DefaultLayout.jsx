import { Header, Footer } from "../components";

function Landing({ children }) {
  
  return (
    <div className="h-[100vh] relative">
      <Header />
      {children}
      <Footer />
      {/* <ChatBox/> */}
    </div>
  );
}

export default Landing;
