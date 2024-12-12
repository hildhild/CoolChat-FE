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
  Organization
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/chatbot-training" element={<ChatbotTraining />} />
        <Route path="/chatbot-training/comparison" element={<ChatbotComparison />} />
        <Route path="/chatbot-editting" element={<ChatbotEditting />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:chatId" element={<ChatDetail />} />
        <Route path="/report" element={<Report />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/organization" element={<Organization />} />
      </Routes>
    </Router>
  );
}

export default App;
