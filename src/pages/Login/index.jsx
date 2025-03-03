import { useSelector } from "react-redux";
import LoginBody from "./LoginBody";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthenLayout } from "../../layouts";

function Login() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user.role);

  useEffect(() => {
    if (accessToken) {
      if (userRole === "AGENT") {
        navigate("/chat");
      } else {
        navigate("/chatbot-training");
      }
    }
  }, []);

  return (
    <AuthenLayout>
      <LoginBody />
    </AuthenLayout>
  );
}

export default Login;
