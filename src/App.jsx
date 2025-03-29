import { useSelector } from "react-redux";
import {
  Landing,
  Signup,
  Login,
  ForgotPassword,
  ChatbotTraining,
  ChatbotEditting,
  Chat,
  Report,
  Subscription,
  Setting,
  VerifyEmail,
  ResetPassword,
  ChatbotComparison,
  ChatDetail,
  Organization,
  Appointment,
  NotFound,
} from "./pages";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { PaymentCancel, PaymentSuccess } from "./pages/Admin/Subscription";
import { useEffect } from "react";

function App() {
  const userRole = useSelector((state) => state.user.role);
  const token = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authPages = [
      "/",
      "/login",
      "/sign-up",
      "/forgot-password",
      "/verify-email",
      "/reset-password",
    ];

    if (token) {
      if (authPages.includes(location.pathname)) {
        if (userRole !== "AGENT") {
          navigate("/chatbot-training");
        } else {
          navigate("/chat");
        }
      }
    } else {
      if (!authPages.includes(location.pathname)) {
        navigate("/");
      }
    }
  }, [token, location, navigate]);

  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {userRole !== "AGENT" && (
          <>
            <Route path="/chatbot-training" element={<ChatbotTraining />} />
            <Route
              path="/chatbot-training/comparison"
              element={<ChatbotComparison />}
            />
            <Route path="/chatbot-editting" element={<ChatbotEditting />} />
            <Route path="/report" element={<Report />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
          </>
        )}
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:chatId" element={<ChatDetail />} />
        <Route path="/setting" element={<Setting />} />

        {userRole === "OWNER" && (
          <Route path="/organization" element={<Organization />} />
        )}
        {userRole === "AGENT" && (
          <Route path="/appointment" element={<Appointment />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
