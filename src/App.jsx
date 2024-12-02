import { Landing, Signup, Login, ForgotPassword, ChatbotTraining, ChatbotEditting, Chat, Report, Subscription, Setting} from './pages';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/chatbot-training" element={<ChatbotTraining/>}/>
        <Route path="/chatbot-editting" element={<ChatbotEditting/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/report" element={<Report/>}/>
        <Route path="/subcription" element={<Subscription/>}/>
        <Route path="/setting" element={<Setting/>}/>

      </Routes>
    </Router>
  )
}

export default App
