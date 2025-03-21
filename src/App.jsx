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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const userRole = useSelector((state) => state.user.role);
  const token = useSelector((state) => state.user.accessToken);
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
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
          </>
        )}

        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:chatId" element={<ChatDetail />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {userRole === "OWNER" && (
          <Route path="/organization" element={<Organization />} />
        )}
        {userRole === "AGENT" && (
          <Route path="/appointment" element={<Appointment />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
