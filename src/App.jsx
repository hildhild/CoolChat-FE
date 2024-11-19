import { Landing, Signup} from './pages';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App
