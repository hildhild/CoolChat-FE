import { useSelector } from "react-redux";
import { ForgotPasswordBody } from "../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthenLayout } from "../layouts";

function ForgotPassword() {
    const accessToken = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();

    useEffect(()=> {
        if (accessToken) {
        navigate("/chatbot-training");
        }
    }, []);

    return (
        <AuthenLayout>
            <ForgotPasswordBody/>
        </AuthenLayout>
    );
}

export default ForgotPassword;


