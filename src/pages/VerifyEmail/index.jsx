import { useNavigate } from "react-router-dom";
import VerifyEmailBody from "./VerifyEmailBody";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthenLayout } from "../../layouts";

function VerifyEmail() {
    const accessToken = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();

    useEffect(()=> {
        if (accessToken) {
        navigate("/chatbot-training");
        }
    }, []);

    return (
        <AuthenLayout>
            <VerifyEmailBody/>
        </AuthenLayout>
    );
}

export default VerifyEmail;


